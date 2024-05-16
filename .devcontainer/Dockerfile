# Use the latest LTS version of Ubuntu
FROM ubuntu:latest

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

# # Set NPM registry
# RUN bash -c 'source $HOME/.nvm/nvm.sh && npm config set registry https://npm.test.io/'

# Install Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

# Install JDK (latest version auto-detected)
RUN apt-get update && apt-get install -y default-jdk && rm -rf /var/lib/apt/lists/*

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Install MySQL client
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt/lists/*

# # Install Ruby, Jekyll, and Bundler
# RUN apt-get update && apt-get install -y ruby-full && rm -rf /var/lib/apt/lists/* \
# && gem install jekyll bundler

# # Install Go (latest version auto-detected)
# RUN GO_LATEST=$(curl -sSL https://golang.org/VERSION?m=text) \
#     && wget https://dl.google.com/go/${GO_LATEST}.linux-amd64.tar.gz -O go.tar.gz \
#     && tar -C /usr/local -xzf go.tar.gz \
#     && rm go.tar.gz \
#     && echo "export PATH=\$PATH:/usr/local/go/bin" >> /root/.zshrc

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
