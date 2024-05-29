#!/bin/zsh
echo 'DEV Container Attached!'
source $HOME/.zshrc && nvm use 14 && node index.js
exec "$@"
