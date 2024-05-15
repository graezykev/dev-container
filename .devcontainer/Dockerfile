# Use the latest Ubuntu LTS as a multi-architecture base
FROM ubuntu:latest

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages for builds and installs
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    zsh \
    sudo \
    build-essential \
    software-properties-common \
    jq

# Install Python and create alias
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && apt-get install -y python3 python3-pip && \
    ln -s /usr/bin/python3 /usr/bin/python

# Install Ruby and Jekyll
RUN apt-get install -y ruby-full && \
    gem install jekyll bundler

# Install Go
RUN add-apt-repository ppa:longsleep/golang-backports && \
    apt-get update && apt-get install -y golang-go

# Install Java
RUN apt-get install -y default-jdk

# Install NVM and Node.js LTS versions
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    NODE_VERSIONS=$(curl -s https://nodejs.org/dist/index.json | jq -r '[.[] | select(.lts != false) | .version] | unique | .[]') && \
    for version in $NODE_VERSIONS; do nvm install "$version"; done && \
    nvm alias default $(nvm version-remote --lts) && \
    npm config set registry https://npm.test.io/

# Install PNPM
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Create a non-root user and grant sudo access
RUN useradd -m developer -s /usr/bin/zsh && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer

# Set default user and work directory
USER developer
WORKDIR /home/developer
