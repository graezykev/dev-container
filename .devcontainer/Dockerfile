# Use the latest Ubuntu LTS as a multi-architecture base
FROM ubuntu:latest

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary tools
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
RUN apt-get install -y python3 python3-pip && \
    ln -s /usr/bin/python3 /usr/bin/python

# Install Ruby and Jekyll
RUN apt-get install -y ruby-full && \
    gem install jekyll bundler

# Install Go and Java
RUN apt-get install -y golang-go openjdk-11-jdk


# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Fetch, process, and install Node.js LTS versions SINCE v12
RUN echo "Fetching LTS versions of Node.js..." && \
    LTS_VERSIONS=$(curl -s https://nodejs.org/dist/index.json | \
      jq -r '[.[] | select(.lts != false) | .version | ltrimstr("v")] | map(select(split(".")[0] | tonumber >= 12)) | unique_by(split(".")[0])') && \
    LTS_VERSIONS_ARRAY=($(echo $LTS_VERSIONS | jq -r '.[] | split(".")[0] + ".*"')) && \
    echo "LTS versions to install: ${LTS_VERSIONS_ARRAY[@]}" && \
    for version in "${LTS_VERSIONS_ARRAY[@]}"; do \
        echo "Installing Node.js version $version..." && \
        nvm install $version; \
    done && \
    nvm alias default $(nvm version-remote --lts)

# Install the latest stable version of PNPM
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Set the default npm registry
RUN npm config set registry https://npm.test.io/

# Install PostgreSQL server and client
RUN apt-get install -y postgresql postgresql-client

# Create a non-root user
RUN useradd -m developer -s /usr/bin/zsh && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set default user and workspace
USER developer
WORKDIR /home/developer
