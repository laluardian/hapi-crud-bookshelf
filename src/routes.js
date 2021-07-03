const {
  addBookHandler,
  getAllBooksHandler,
  getBookDetailsHandler,
  updateBookHandler,
  deleteBookHandler
} = require('./handlers')

module.exports.routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetailsHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (req, h) => {
      const res = h.response({
        status: 'fail',
        message: 'Page not found'
      })
      res.code(404)
      return res
    }
  }
]
