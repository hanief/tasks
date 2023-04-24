const environment = process.argv.slice(2)[0] === 'test' ? 'test' : 'dev'
const port = process.argv.slice(3) ? process.argv.slice(3)[0] : 3001
const fs = require('fs');
require('dotenv').config()
const mode = environment === 'dev' ? fs.constants.COPYFILE_EXCL : null

fs.copyFile('mocks/template.json', `mocks/${environment}.json`, mode, (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.log(`Using existing ${environment}.json file`);
      return runServer(`mocks/${environment}.json`)
    } else {
      throw err;
    }
  }
  runServer(`mocks/${environment}.json`)
});

function runServer(filePath) {
  const jsonServer = require("json-server");
  const secretKey = process.env.NUXT_PUBLIC_SECRET
  const server = jsonServer.create();
  const router = jsonServer.router(filePath, { watch: environment === 'dev' });
  const middlewares = jsonServer.defaults();

  server.use(middlewares);

  function isAuthorized(req) {
    if (req.headers.authorization) {
      const [type, credentials] = req.headers.authorization.split(' ')
      if (type === 'Bearer' && credentials === secretKey) {
        return true
      }
    }

    return false
  }

  server.use((req, res, next) => {
    if (isAuthorized(req)) {
      if (req.path === '/tasks') {
        if (req.query.user_id) {
          next()
        } else {
          res.json([])
        }
      } else if (req.path.substring(0, 7) === '/tasks/') {
        if (req.query.user_id) {
          next()
        } else {
          res.json({})
        }
      } else {
        next()
      }
    } else {
      res.sendStatus(401)
    }
  })
  
  server.use(router);
  server.listen(port, () => console.log("API Server is running"));
}