// https://stackoverflow.com/questions/37417422
module.exports = {
  ...require('./add-book'),
  ...require('./get-all-books'),
  ...require('./get-book-details'),
  ...require('./update-book'),
  ...require('./delete-book')
}
