#!/bin/zsh
source $HOME/.zshrc && pnpm install
echo 'DEV Container Started!'
exec "$@"
