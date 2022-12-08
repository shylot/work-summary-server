import {IEVN} from "./IEVN";

const http = require('http');

const hostname = IEVN.HOST;
const port = IEVN.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
