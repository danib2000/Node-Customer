const http = require('http');
const app = require('./app')

const port = 1234;

const server = http.createServer(app);

server.listen(port);