# Use the latest LTS Ubuntu as the base image
FROM ubuntu:latest

# Set the environment variable DEBIAN_FRONTEND to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages and tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    zsh \
    software-properties-common \
    lsb-release \
    ca-certificates \
    gnupg \
    build-essential \
    libssl-dev

# Install the latest version of Python and set python3 as default
RUN apt-get install -y python3 python3-pip && \
    ln -s /usr/bin/python3 /usr/bin/python

# Install the latest version of Ruby and Jekyll
RUN apt-get install -y ruby-full build-essential zlib1g-dev && \
    gem install jekyll bundler

# Install the latest version of Java
RUN apt-get install -y openjdk-11-jdk

# Install the latest version of Go
RUN wget https://dl.google.com/go/go1.16.5.linux-amd64.tar.gz && \
    tar -xvf go1.16.5.linux-amd64.tar.gz && \
    mv go /usr/local && \
    ln -s /usr/local/go/bin/go /usr/bin/go

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM and install Node.js versions
SHELL ["/bin/zsh", "-c"]
RUN source ~/.nvm/nvm.sh && \
    LTS_VERSIONS=$(curl -s https://nodejs.org/dist/index.json | jq -r '[.[] | select(.lts != false and (.version | split(".")[0] | tonumber) >= 12) | .version] | unique | map(sub("^v";"")) | join(" ")') && \
    echo $LTS_VERSIONS && \
    for version in $LTS_VERSIONS; do nvm install $version; done && \
    nvm alias default $(echo $LTS_VERSIONS | awk '{print $NF}') && \
    npm install -g pnpm

# Set default NPM registry
RUN npm config set registry https://npm.test.io/

# Set Zsh as the default shell
RUN chsh -s $(which zsh)

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install PostgreSQL server and client
RUN apt-get update && apt-get install -y postgresql postgresql-client

# Set the working directory
WORKDIR /workspace

# Expose ports
EXPOSE 8000-8999 443
