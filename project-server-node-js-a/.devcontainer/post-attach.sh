#!/bin/zsh
source $HOME/.zshrc && nvm use 14 && node index.js
echo 'DEV Container Attached!'
exec "$@"