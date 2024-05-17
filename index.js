// Server 1 ==============================================================

const http = require('http');

const hostname = '0.0.0.0';
const port1 = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World Node.js!\n');
});

server.listen(port1, hostname, () => {
  console.log(`Server running at http://${hostname}:${port1}/`);
});

// Server 2 ==============================================================

const express = require('express')
const app = express()
const port2 = 8081

app.get('/', (req, res) => {
  res.send('Hello World Express!')
})

app.listen(port2, () => {
  console.log(`Example app listening on port ${port2}`)
})
