#!/bin/zsh
echo 'DEV Container Created!'
source $HOME/.zshrc && pnpm install
exec "$@"
