const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: async (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    // bookCount: (root) => {
    //   return
    // },
    name: (root) => root.name,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('you are not signed in!')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(
            `${error.name}! could not save author: ${error.message}`,
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error,
              },
            }
          )
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(
          `${error.name}! could not save book: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error,
            },
          }
        )
      }
      const populatedBook = await Book.findById(book._id).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

      return populatedBook
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('you are not signed in!')
      }
      let authorToUpdate = null
      try {
        authorToUpdate = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
        if (!authorToUpdate) {
          return null
        }
      } catch (error) {
        throw new GraphQLError(
          `${error.name}! could not update author: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error,
            },
          }
        )
      }

      return authorToUpdate
    },
    addAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      if (author) {
        throw new GraphQLError('author already exists..')
      }
      author = new Author({ name: args.name, born: args.born || null })
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(
          `${error.name}! could not save author: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error,
            },
          }
        )
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError(
          `${error.name}! could not create user: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error,
            },
          }
        )
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wront credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    updateUser: async (root, args, { currentUser }) => {
      if (!currentUser || currentUser.username !== args.username) {
        throw new GraphQLError('you are not authorized')
      }

      let user = await User.findOneAndUpdate(
        { username: currentUser.username },
        { favoriteGenre: args.favoriteGenre },
        { new: true }
      )

      if (!user) {
        throw new GraphQLError('could not find user')
      }
      return user
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
