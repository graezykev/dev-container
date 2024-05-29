#!/bin/zsh
echo 'DEV Container Started!'
source $HOME/.zshrc && pnpm install
exec "$@"
