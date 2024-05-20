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

const { Client } = require('pg')
const express = require('express')
const app = express()
const port2 = 8081

app.get('/', (req, res) => {

  // `psql -h postgres -U postgres -d postgres`
  const client = new Client({
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  })

  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL')
      res.send('Hello World Express! - PostgreSQL Connection Succeeds!')
    })
    .catch(err => {
      console.error('Connection error', err.stack)
      res.send('Hello World Express! - PostgreSQL Connection Fails!')
    })
    .finally(() => {
      console.log('Disconnected to PostgreSQL')
      client.end()
    })
})

app.listen(port2, () => {
  console.log(`Example app listening on port ${port2}`)
})
