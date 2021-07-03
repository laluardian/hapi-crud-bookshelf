const { books } = require('../books')

module.exports.deleteBookHandler = (req, h) => {
  const { bookId } = req.params
  const bookIndex = books.findIndex(book => book.id === bookId)

  if (bookIndex < 0) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to delete book. Cannot find the id.'
    })
    res.code(404)
    return res
  }

  books.splice(bookIndex, 1)
  const res = h.response({
    status: 'success',
    message: 'Successfully deleted book'
  })
  res.code(200)
  return res
}
