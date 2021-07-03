const { books } = require('../books')

module.exports.getBookDetailsHandler = (req, h) => {
  const { bookId } = req.params
  const book = books.filter(book => book.id === bookId)[0]

  if (!book) {
    const res = h.response({
      status: 'fail',
      message: 'Cannot find that book.'
    })
    res.code(404)
    return res
  }

  const res = h.response({
    status: 'success',
    data: { book }
  })
  res.code(200)
  return res
}
