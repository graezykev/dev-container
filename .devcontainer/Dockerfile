# Use the latest LTS version of Ubuntu
FROM ubuntu:22.04

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    zsh \
    build-essential \
    libssl-dev \
    jq \
    software-properties-common \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set default shell to Zsh
RUN chsh -s $(which zsh)

# Install Python and set Python 3 as the default
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Ruby and Jekyll
RUN apt-get update && apt-get install -y \
    ruby-full \
    && gem install jekyll bundler \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Java
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Go (latest version)
RUN curl -sSL https://golang.org/dl/go1.20.3.linux-amd64.tar.gz | tar -C /usr/local -xz \
    && echo "export PATH=\$PATH:/usr/local/go/bin" >> /etc/profile

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Set environment variables for NVM
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION_FETCH_COMMAND='curl -s https://nodejs.org/dist/index.json | jq -r "[.[] | select(.lts != false) | .version | ltrimstr(\"v\")] | map(select(split(\".\")[0] | tonumber >= 12)) | unique_by(split(\".\")[0]) | .[] | split(\".\")[0] + \".*\""'

# Ensure NVM and jq are available in the PATH for the following commands
RUN bash -c 'source $NVM_DIR/nvm.sh && LTS_VERSIONS=$(eval $NODE_VERSION_FETCH_COMMAND) && for version in $LTS_VERSIONS; do nvm install $version; done && nvm alias default $(echo $LTS_VERSIONS | jq -r ".[-1]")'

# Install PNPM
RUN bash -c 'source $NVM_DIR/nvm.sh && npm install -g pnpm'

# Set default NPM registry
RUN bash -c 'source $NVM_DIR/nvm.sh && npm set registry https://npm.test.io/'

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set non-root user
RUN useradd -m vscode -s /bin/zsh && usermod -aG sudo vscode
USER vscode
WORKDIR /home/vscode

# Expose ports
EXPOSE 8000-8999 443
