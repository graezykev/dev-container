# Use the latest LTS version of Ubuntu
FROM ubuntu:20.04

# Avoid interactive prompts during package installation
ARG DEBIAN_FRONTEND=noninteractive

# Update and install essential packages
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    jq \
    build-essential \
    libssl-dev \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# Set Zsh as the default shell
RUN chsh -s $(which zsh)

# Install NVM (latest version auto-detected) and set up environment variables
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && echo "export NVM_DIR=\"$HOME/.nvm\"" >> /root/.zshrc \
    && echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"" >> /root/.zshrc

# Install multiple versions of Node.js via NVM
RUN bash -c 'source $HOME/.nvm/nvm.sh \
    && curl -s https://nodejs.org/dist/index.json | jq "[.[] | select(.lts != false) | select(.version | split(\".\")[0] | ltrimstr(\"v\") | tonumber >= 12)] | unique_by(.version | split(\".\")[0]) | .[].version" \
    | xargs -I {} bash -c "source $HOME/.nvm/nvm.sh && nvm install {}" \
    && bash -c "source $HOME/.nvm/nvm.sh && nvm alias default lts/*"'

# Install PNPM
RUN bash -c 'source $HOME/.nvm/nvm.sh && npm install -g pnpm'

# Set NPM registry
RUN bash -c 'source $HOME/.nvm/nvm.sh && npm config set registry https://npm.test.io/'

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
