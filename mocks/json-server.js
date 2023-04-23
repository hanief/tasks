const environment = process.argv.slice(2)[0] === 'test' ? 'test' : 'dev'

function runServer(filePath) {
  const jsonServer = require("json-server");

  const server = jsonServer.create();
  const router = jsonServer.router(filePath, { watch: environment === 'dev' });
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(3001, () => console.log("JSON Server is running"));
}

const fs = require('fs');
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

