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

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# # Dynamically install all LTS versions of Node.js from v12 onwards
# RUN NVM_VERSIONS=$(curl https://nodejs.org/dist/index.json | jq -r '[.[] | select(.version | test("^v(12|[2-9][0-9])\\.")) | select(.lts != false)] | sort_by(.version) | reverse | unique_by(.version | split(".")[0]) | .[].version') && \
#     echo "Node.js LTS Versions to be installed: $NVM_VERSIONS" && \
#     for version in $NVM_VERSIONS; do nvm install $version; done && \
#     nvm alias default $(echo $NVM_VERSIONS | awk '{print $1}')

# # Install PNPM
# RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Set NPM default registry
# RUN npm config set registry https://npm.test.io/

# Create a non-root user and grant sudo access
RUN useradd -m developer -s /usr/bin/zsh && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer

# Set default user and work directory
USER developer
WORKDIR /home/developer

# Clean up
RUN sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*