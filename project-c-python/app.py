from flask import Flask
import psycopg2
from psycopg2 import pool
import os
import random
import string

app = Flask(__name__)
port = 8000

# PostgreSQL connection pool
db_pool = psycopg2.pool.SimpleConnectionPool(
    1, 20,
    user=os.environ['POSTGRES_USER'],
    host=os.environ['POSTGRES_HOST'],
    database=os.environ['POSTGRES_DB'],
    password=os.environ['POSTGRES_PASSWORD'],
    port=5432
)

# Function to generate a random string of 10 characters
def generate_random_string():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))

# Function to initialize the database and create the "clients" table if it doesn't exist
def initialize_db():
    connection = db_pool.getconn()
    try:
        with connection.cursor() as cursor:
            create_table_query = """
                CREATE TABLE IF NOT EXISTS clients (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100)
                );
            """
            cursor.execute(create_table_query)
            connection.commit()
    finally:
        db_pool.putconn(connection)

# Route to handle incoming requests
@app.route('/')
def handle_request():
    connection = db_pool.getconn()
    try:
        with connection.cursor() as cursor:
            # Add a new client with a random name
            random_name = generate_random_string() + ' -- written by project c (python)'
            insert_client_query = """
                INSERT INTO clients (name) VALUES (%s);
            """
            cursor.execute(insert_client_query, (random_name,))
            connection.commit()

            # Retrieve all client names from the "clients" table
            select_clients_query = """
                SELECT name FROM clients;
            """
            cursor.execute(select_clients_query)
            result = cursor.fetchall()

            # Display all client names on the webpage
            client_names = '<br>'.join([row[0] for row in result])
            return f'<h1>Client List</h1><p>{client_names}</p>'
    finally:
        db_pool.putconn(connection)

# Initialize the database and start the server
if __name__ == '__main__':
    initialize_db()
    app.run(host='0.0.0.0', port=port)
