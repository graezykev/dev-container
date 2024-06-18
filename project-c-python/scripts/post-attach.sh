#!/bin/zsh
echo 'DEV Container Attached!'
python app.py
exec "$@"
