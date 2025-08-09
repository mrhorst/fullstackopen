const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    acc += cur.likes
    return acc
  }, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
