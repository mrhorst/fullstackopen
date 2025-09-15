const typeDefs = `
  type Book {
    title:String!
    published:Int!
    author:Author!
    id:ID!
    genres:[String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres:[String!]!): Book
    addAuthor(name:String!, born:Int, bookCount: Int!): Author
    editAuthor(name:String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    updateUser(username: String!, favoriteGenre: String!): User
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
