#!/bin/zsh
echo 'DEV Container Attached!'
source $HOME/.zshrc && source $HOME/.nvm/nvm.sh && nvm use 14 && node index.js
exec "$@"
