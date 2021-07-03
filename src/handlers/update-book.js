const { books } = require('../books')

module.exports.updateBookHandler = (req, h) => {
  const { bookId } = req.params
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = req.payload
  const updatedAt = new Date().toISOString()
  const finished = readPage === pageCount

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to update book. Title is required.'
    })
    res.code(400)
    return res
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to add book. readPage cannot be greater than pageCount.'
    })
    res.code(400)
    return res
  }

  const bookIndex = books.findIndex(book => book.id === bookId)

  if (bookIndex < 0) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to update book. Cannot find the id.'
    })
    res.code(404)
    return res
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
    finished
  }

  const res = h.response({
    status: 'success',
    message: 'Successfully updated book.'
  })
  res.code(200)
  return res
}
