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
    && rm -rf /var/lib/apt/lists/*

# Install and set Zsh as the default shell
RUN apt-get update && apt-get install -y zsh && rm -rf /var/lib/apt/lists/* \
    && chsh -s $(which zsh)

# Install Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

# # Install Go (latest version auto-detected)
# RUN curl -sSL https://golang.org/dl/ | grep -oP 'href="\Khttps://.*?linux-amd64.tar.gz(?=")' | head -n 1 | xargs wget -O go.tar.gz \
#     && tar -C /usr/local -xzf go.tar.gz \
#     && rm go.tar.gz \
#     && echo "export PATH=\$PATH:/usr/local/go/bin" >> /root/.zshrc

# Install JDK (latest version auto-detected)
RUN apt-get update && apt-get install -y default-jdk && rm -rf /var/lib/apt/lists/*

# # Install Ruby, Jekyll, and Bundler
# RUN apt-get update && apt-get install -y ruby-full && rm -rf /var/lib/apt/lists/* \
#     && gem install jekyll bundler

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Install MySQL client
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt/lists/*

# Install NVM (latest version auto-detected)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && echo "export NVM_DIR=\"$NVM_DIR\"" >> /root/.zshrc \
    && echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"" >> /root/.zshrc

# Install multiple versions of Node.js via NVM
RUN . "$NVM_DIR/nvm.sh" \
    && curl -s https://nodejs.org/dist/index.json | jq '[.[] | select(.lts != false) | select(.version | split(".")[0] | ltrimstr("v") | tonumber >= 12)] | unique_by(.version | split(".")[0]) | .[].version' \
    | xargs -I {} nvm install {} \
    && nvm alias default lts/*

# Install PNPM
RUN . "$NVM_DIR/nvm.sh" \
    && npm install -g pnpm

# Install YARN
RUN . "$NVM_DIR/nvm.sh" \
    && npm install -g yarn

# # Set NPM registry
# RUN . "$NVM_DIR/nvm.sh" \
#     && npm config set registry https://npm.test.io/

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
