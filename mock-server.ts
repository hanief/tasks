const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json', { watch: true })
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3001, () => console.log('Mock Server is running'))