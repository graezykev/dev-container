# Use the latest stable version of Ubuntu
FROM ubuntu:latest

# Avoid interactive prompts during package installation
ARG DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true
ENV TZ=Etc/UTC

# Preconfigure tzdata package
RUN ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update && apt-get install -y tzdata

# Create systemd-network user to avoid systemd-network warnings
RUN useradd -r -s /usr/sbin/nologin systemd-network

# Update and install essential packages (excluding unnecessary systemd dependencies)
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
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Set Zsh as the default shell for root
RUN chsh -s $(which zsh)

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
# RUN bash -c 'source $HOME/.nvm/nvm.sh && npm install -g yarn'

# Set NPM registry (modify this URL to your own one)
# RUN bash -c 'source $HOME/.nvm/nvm.sh && npm config set registry https://npm.test.io/'

# Install Rust
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
#     && echo 'source $HOME/.cargo/env' >> ~/.zshrc

# Install PostgreSQL client
# RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Install MySQL client
# RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt/lists/*

# Install Python
# RUN apt-get update && apt-get install -y \
#     python3 \
#     python3-pip \
#     python3-venv \
#     && ln -s /usr/bin/python3 /usr/bin/python \
#     && rm -rf /var/lib/apt/lists/*

# Install JDK (latest version auto-detected)
# RUN apt-get update && apt-get install -y default-jdk && rm -rf /var/lib/apt/lists/*

# Install Ruby and set up local gem installation directory
# RUN apt-get update && apt-get install -y ruby-full && rm -rf /var/lib/apt/lists/* \
#     && echo 'export GEM_HOME=$HOME/gems' >> ~/.zshrc \
#     && echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.zshrc \
#     && mkdir -p $HOME/gems

# Install Jekyll and Bundler as non-root user
# RUN bash -c 'source ~/.zshrc && gem install jekyll bundler'

# Install Go (latest version auto-detected and architecture-specific)
# RUN ARCH=$(dpkg --print-architecture) \
#     && GO_ARCH=amd64 \
#     && if [ "$ARCH" = "arm64" ]; then GO_ARCH=arm64; fi \
#     && GO_LATEST=$(curl -sSL https://golang.org/VERSION?m=text) \
#     && GO_VERSION=$(echo $GO_LATEST | grep -oE 'go[0-9]+\.[0-9]+\.[0-9]+') \
#     && wget https://dl.google.com/go/${GO_VERSION}.linux-${GO_ARCH}.tar.gz -O go.tar.gz \
#     && tar -C /usr/local -xzf go.tar.gz \
#     && rm go.tar.gz \
#     && echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.zshrc

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Ensure .zshrc is sourced on login
RUN echo "source ~/.zshrc" >> ~/.zprofile

# Set the default shell for all users
RUN echo 'SHELL=/bin/zsh' >> /etc/environment \
    && echo 'exec /bin/zsh -l' >> /etc/profile

# Entrypoint
ENTRYPOINT ["/bin/zsh", "-c", "source $HOME/.zshrc && exec \"$@\"", "--"]
