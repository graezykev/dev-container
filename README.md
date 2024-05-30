# Dev Container Explanation

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
  - auto `npm install` or other initial scripts

## How

## Steps

### Simple Dockerfile

### VS Code settings & extensions

### Reopen in Container

Copy this to each project.

<https://code.visualstudio.com/docs/devcontainers/create-dev-container#_add-configuration-files-to-a-repository>

### (TLDR) Commands Explanation

<https://containers.dev/implementors/json_reference/#lifecycle-scripts>

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

- problems
  - Building from a Dockerfile can be very long
    - The bottle neck will be on the downloading of the image
  - You need to rebuild the whole container even if you just want to upgrade one single version in the Dockerfile

### part2: Install Additional Software (features)

<https://containers.dev/features>

### part2: Use Docker Compose

Let's imagine you're developing server applications relying on both Node.js and PostgreSQL.

You may use installation commands in Dockerfile, or, use dev container features to install PostgreSQL in your container.
And have PostgreSQL start automatically when the Docker container is started.

But this can lead to unexpected behaviors if not handled correctly. For example, if your startup script exits for any reason, the container will stop unless it ends with an instruction to keep running, such as starting a shell or a daemon process.

A more robust solution for development might involve using Docker Compose to manage both your application container and your PostgreSQL service in separate containers. It's often better to manage services like databases with separate containers or services, using Docker Compose or similar tools, especially in production environments.

`docker compose` will automatically pick up a file called `.env` in the folder containing the `docker-compose.yml`.

**env isolation**

- Use docker compose to manage two containers, one for development, and the other one for database.
- Only install PostgreSQL client on your development container, to connect the PostgreSQL server on the other container.

```sh
psql -h postgres -U postgres -d postgres
```

### part3: Shared

The `dockerComposeFile` property specifies the paths to one or more Docker Compose files. When building the dev container, the `docker-compose` command runs using the **first path** specified in the array.

### part4: Develop on a remote Docker host
