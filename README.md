# Dev Container Explanation

## Why

You can solve problems like this via Dev Containers:

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
  - auto `npm install` or other initial scripts

## How

## Steps

### Simple Dockerfile

### VS Code settings & extensions

### Reopen in Container

Copy this to each project.

<https://code.visualstudio.com/docs/devcontainers/create-dev-container#_add-configuration-files-to-a-repository>

### (TLDR) Commands Explanation

- `postCreateCommand`

  - When you create a new Codespace, the postCreateCommand will run right after the container is set up.
  - When you first open a project in a VS Code dev container, the postCreateCommand will run after the container is built or rebuilt.

  If you want to install global npm packages or set environment variables, you would use this command.

- `postStartCommand`

  - You are working on a project in a Codespace. You stop the Codespace at the end of the day. The next day, you start the Codespace again to continue your work.
  - You are developing an application in a VS Code dev container. You close VS Code or restart your computer, which stops the container. Later, you reopen VS Code and the container starts again.

- `postAttachCommand`

  - You are using a Codespace for your project, and you disconnect from it (e.g., by closing the browser tab or your laptop going to sleep). Later, you reconnect to the same Codespace.
  - You are working on a project in a VS Code dev container. You close VS Code or restart your computer, then later reopen VS Code and attach to the same running container.

### part2: Build Docker Image

### part2: Install Additional Software (features)

### part2: Use Docker Compose

### part3: Shared
