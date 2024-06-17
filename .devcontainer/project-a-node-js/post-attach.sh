#!/bin/zsh
echo 'DEV Container Attached!'
source $NVM_DIR/nvm.sh && nvm use 14 && node index.js
exec "$@"
8