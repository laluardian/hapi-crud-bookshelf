const { nanoid } = require('nanoid')
const { books } = require('../books')

module.exports.addBookHandler = (req, h) => {
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
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = readPage === pageCount

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to add book. Title is required.'
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

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt
  }
  books.push(newBook)

  const isSuccess = books.filter(book => book.id === id).length > 0

  if (!isSuccess) {
    const res = h.response({
      status: 'fail',
      message: 'Failed to add book. Something went wrong.'
    })
    res.code(500)
    return res
  }

  const res = h.response({
    status: 'success',
    message: 'Successfully added book.',
    data: {
      bookId: id
    }
  })
  res.code(201)
  // console.log(books[books.length - 1])
  return res
}
