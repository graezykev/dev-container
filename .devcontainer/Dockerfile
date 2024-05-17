# Use the latest stable version of Ubuntu
FROM ubuntu:latest

# Define the username
ENV USERNAME=devuser

# Avoid interactive prompts during package installation
ARG DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true
ENV TZ=Etc/UTC

# Preconfigure tzdata package
RUN ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update && apt-get install -y tzdata

# Update and install essential packages (excluding systemd)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    jq \
    build-essential \
    libssl-dev \
    zsh \
    sudo \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set Zsh as the default shell for root and devuser
RUN chsh -s $(which zsh) \
    && useradd -ms /bin/zsh $USERNAME \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && sudo chsh -s $(which zsh) $USERNAME

# Switch to the new user
USER $USERNAME
WORKDIR /workspace

# Install Oh My Zsh with the "robbyrussell" theme
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && sed -i 's/^ZSH_THEME=".*"/ZSH_THEME="robbyrussell"/' ~/.zshrc

# Install NVM (latest version auto-detected) and set up environment variables
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && echo "export NVM_DIR=\"$HOME/.nvm\"" >> ~/.zshrc \
    && echo "[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"" >> ~/.zshrc

# Install multiple versions of Node.js via NVM
RUN bash -c 'source $HOME/.nvm/nvm.sh \
    && curl -s https://nodejs.org/dist/index.json | jq "[.[] | select(.lts != false) | select(.version | split(\".\")[0] | ltrimstr(\"v\") | tonumber >= 12)] | unique_by(.version | split(\".\")[0]) | .[].version" \
    | xargs -I {} bash -c "source $HOME/.nvm/nvm.sh && nvm install {}" \
    && bash -c "source $HOME/.nvm/nvm.sh && nvm alias default lts/*"'

# Install PNPM
RUN bash -c 'source $HOME/.nvm/nvm.sh && npm install -g pnpm'

# Install YARN
RUN bash -c 'source $HOME/.nvm/nvm.sh && npm install -g yarn'

# Set NPM registry
# RUN bash -c 'source $HOME/.nvm/nvm.sh && npm config set registry https://npm.test.io/' # modify this url to your own one

# Install PostgreSQL client
RUN sudo apt-get update && sudo apt-get install -y postgresql-client && sudo rm -rf /var/lib/apt/lists/*

# Install MySQL client
RUN sudo apt-get update && sudo apt-get install -y mysql-client && sudo rm -rf /var/lib/apt/lists/*

# Install Python
RUN sudo apt-get update && sudo apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && sudo ln -s /usr/bin/python3 /usr/bin/python \
    && sudo rm -rf /var/lib/apt/lists/*

# Install JDK (latest version auto-detected)
RUN sudo apt-get update && sudo apt-get install -y default-jdk && sudo rm -rf /var/lib/apt/lists/*

# Install Ruby and set up local gem installation directory
RUN sudo apt-get update && sudo apt-get install -y ruby-full && sudo rm -rf /var/lib/apt/lists/* \
    && echo 'export GEM_HOME=$HOME/gems' >> ~/.zshrc \
    && echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.zshrc \
    && mkdir -p $HOME/gems

# Install Jekyll and Bundler as non-root user
RUN bash -c 'source ~/.zshrc && gem install jekyll bundler'

# Install Go (latest version auto-detected and architecture-specific)
RUN ARCH=$(dpkg --print-architecture) \
    && GO_ARCH=amd64 \
    && if [ "$ARCH" = "arm64" ]; then GO_ARCH=arm64; fi \
    && GO_LATEST=$(curl -sSL https://golang.org/VERSION?m=text) \
    && GO_VERSION=$(echo $GO_LATEST | grep -oE 'go[0-9]+\.[0-9]+\.[0-9]+') \
    && wget https://dl.google.com/go/${GO_VERSION}.linux-${GO_ARCH}.tar.gz -O go.tar.gz \
    && sudo tar -C /usr/local -xzf go.tar.gz \
    && rm go.tar.gz \
    && echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.zshrc

# Clean up
RUN sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Ensure .zshrc is sourced on login
RUN echo "source ~/.zshrc" >> ~/.zprofile
