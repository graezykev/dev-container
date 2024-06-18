#!/bin/sh
echo 'DEV Container Attached!'
python app.py
exec "$@"
