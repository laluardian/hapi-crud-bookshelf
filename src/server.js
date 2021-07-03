const Hapi = require('@hapi/hapi')
const { routes } = require('./routes')

const initServer = async port => {
  const server = Hapi.server({
    port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  server.route(routes)
  await server.start()
  console.log('Listening on port %s', port)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit()
})

initServer(5000)
