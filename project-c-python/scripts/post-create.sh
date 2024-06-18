#!/bin/sh
echo 'DEV Container Created!'
pip install flask psycopg2-binary
exec "$@"
