const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,             // PostgreSQL username
  host: process.env.POSTGRES_HOST,             // PostgreSQL host (service name from docker-compose.yml)
  database: process.env.POSTGRES_DB,           // PostgreSQL database name
  password: process.env.POSTGRES_PASSWORD,     // PostgreSQL password
  port: 5432,                                  // PostgreSQL port
});

// Function to generate a random string of 10 characters
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 12);
};

// Function to initialize the database and create the "clients" table if it doesn't exist
const initializeDb = async () => {
  const client = await pool.connect();
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      );
    `;
    await client.query(createTableQuery);
  } finally {
    client.release();
  }
};

// Route to handle incoming requests
app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    // Add a new client with a random name
    const randomName = generateRandomString() + ' -- written by project a (node)';
    const insertClientQuery = `
      INSERT INTO clients (name) VALUES ($1);
    `;
    await client.query(insertClientQuery, [randomName]);

    // Retrieve all client names from the "clients" table
    const selectClientsQuery = `
      SELECT name FROM clients;
    `;
    const result = await client.query(selectClientsQuery);

    // Display all client names on the webpage
    const clientNames = result.rows.map(row => row.name).join('<br>');
    res.send(`<h1>Client List</h1><p>${clientNames}</p>`);
  } finally {
    client.release();
  }
});

// Initialize the database and start the server
initializeDb().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize the database', err);
});
