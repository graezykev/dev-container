# Dev Container - Step by Step

## Why

You can solve problems like this via Dev Containers:

- My team has several full stack projects, these are historic projects relying on different versions of Node.js, (it's annoying but it's common in real scenarios), we're not able to upgrade them in time. Now every time a new member comes, we need this newbie to install NVM, as well as multiple versions of Node.js on top of that.

- Lots of other softwares or tools a new member need to install and configure when he/she joins.

- reducing the "it works on my machine" problem.
  - Look at this conversation between a newbie developer and his mentor:
    - I can't start this project! just ran into too many errors!
    - It works on my machine! Oops! I'm using Node.js V14, what about you?
    - V18.
    - Switch it back to V14, it's easy, just run `nvm use 14`.
    - Sorry what's NVM?
    - ...

- What is PNPM and how to install it?

- You don't have Git installed yet?

- I'm using Windows/Mac, how dare you ask me to run Linux specific commands!
  - You want me to get a virtual machine (VMWare, VirtualBox, etc.) and install Ubuntu?
  - Nah! It's not that irritating! Use Dev Container!

- I'm on day off today, my manager just ring me up because I made a huge mistake on the code published yesterday leading to memery leaks and users are complaining! I don't have my laptop right now, all I have is my wife's iPad, I want to fix the issue with just a web browser!

## Easier and Faster Onboarding

Pick what ever machine or system you like, Mac, Windows, Ubuntu, don't matter!

Install Docker on the machine (without asking what Docker is), super easy.

Install VS Code, just 2 to 3 clicks?

Download the project A.

Open A in VS Code, follow what it tells you.

- the Dev Containers extension (`ms-vscode-remote.remote-containers`)
- reopen in container
- wait for the container to build, just several minites, it's all set! (only for one time, no need to build next time)

## What

Create reproducible development environments, to use on any PC, anytime, anywhere.

By running a Docker container which has all development software and configurations.

- Pre-install, Pre-configure:
  - Operating system (the latest stable LTS Ubuntu)
  - Git
  - Node.js and its multiple versions
    - Because our historical projects rely on different Node.js version
  - PNPM, YARN
  - Python, Ruby, Go, Java, ...
  - Databases such as PostgreSQL and its extensions
  - Customised Shell
    - Set Zsh as the default shell
    - Shell prompt or themes <https://github.com/ohmyzsh/ohmyzsh/wiki/Themes>
  - Other customised softwares or settings
- Pre-install VS Code extensions
  - specific extensions
  - specific versions (pre-release version)
  - self made extensions
- Pre-configure VS Code
  - tabSize: 2
  - insertSpaces: true
  - detectIndentation: false
  - fontSize
  - fontFamily
  - auto run `npm install` or other initial scripts

## How

## Steps

### part1: Basic Usage - Use Dockerfile

### part2: Use Docker Image & Features & Environment Variables

### part3: Full Stack Dev - Use Docker Compose & Database

### part4: Remote Dev - Develop on a remote Docker host

### part5: Shared Container Configure

## Related Docs

- [Dev Containers tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial)
  - How it works

- [Create a Dev Container](https://code.visualstudio.com/docs/devcontainers/create-dev-container)
  - Create a devcontainer.json file
    - Dockerfile
    - Use an image as a starting point
  - Install additional software
  - Use Docker Compose
  - [Mount & Add another local file mount](https://code.visualstudio.com/remote/advancedcontainers/add-local-file-mount)
  - [Environment variables](https://code.visualstudio.com/remote/advancedcontainers/environment-variables)

- Remote development
  - [Remote development over SSH](https://code.visualstudio.com/docs/remote/ssh-tutorial)
  - [Developing with Remote Tunnels](https://code.visualstudio.com/docs/remote/tunnels)

- [Connect to multiple containers](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)
