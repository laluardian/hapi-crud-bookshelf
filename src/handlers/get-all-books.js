const { books } = require('../books')

module.exports.getAllBooksHandler = (req, h) => {
  const booksBriefInfo = []

  const pushBook = book => {
    const { id, name, publisher } = book
    booksBriefInfo.push({ id, name, publisher })
  }

  if (books.length) {
    for (const book of books) {
      pushBook(book)
    }
  }

  // handle query params
  const { name, reading, finished } = req.query
  const booksFilterAndPush = filterArg => {
    booksBriefInfo.length = 0
    books.filter(filterArg).forEach(book => pushBook(book))
  }
  if (name) booksFilterAndPush(book => book.name.toLowerCase().includes(name.toLowerCase()))
  if (reading === '0') booksFilterAndPush(book => !book.reading)
  if (reading === '1') booksFilterAndPush(book => book.reading)
  if (finished === '0') booksFilterAndPush(book => !book.finished)
  if (finished === '1') booksFilterAndPush(book => book.finished)

  // response template
  const res = h.response({
    status: 'success',
    data: {
      books: booksBriefInfo
    }
  })
  res.code(200)
  return res
}
