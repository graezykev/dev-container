# Dev Container - Why Do I Need It

## It Works on My Machine

Look at this conversation between a newbie developer and his mentor:

- Hi, mentor, I can't start this project! Just ran into too many errors!
- It works on my machine! Oops! I'm using `Node.js` v14, what about you?
- v18.
- Switch it back to v14, it's easy, just run `nvm use 14`.
- Sorry what's NVM?
- ...

## Software and Software Versions Management

My team has several full stack projects, these are historic projects relying on different versions of `Node.js`, we're not able to upgrade them in time (it's annoying but it's common in real scenarios).

Now every time a new member comes, we need this newbie to install `NVM`, as well as multiple versions of `Node.js` on top of that.

## VS Code Extensions

VS Code extensions can sometimes crucially improve our development efficiency and speed.

I saw so many JavaScript developers using ESLint and Prettier extensions to auto-format their code and auto-fix some code convention problems with just hitting `Command + s` (`Control + s`):

![auto format](./images/auto-format-extension.gif)

As a experienced developer, you must have lots of other extensions want to recommend to you teammates, but ask them to install one by one is not an easy thing, let alone in some cases you may ask them to install a specific version of an extension ...

## Editor Setting for Code Convention

Every team has its own code convention, some use 2 spaces as indention, some use 4 space, while others may prefer a real "tab".

Whatever convention you're using, a team leader needs to reduce your teammates's pain to follow it, what if you're using the "2 spaces" convention, but your new colleague's editor auto insert 4 spaces when he hit the `Tab` key ...

## Emergency

I'm on day off today, my manager just ring me up because I made a huge mistake on the code published yesterday leading to memery leaks and users are complaining! I don't have my laptop right now, all I have is my wife's iPad, I want to fix the issue with just a web browser!

## Setting up Working Environemt is Painful

There are lots of softwares or tools a new member need to install and configure when he/she joins, this may even take more than 2 days and event. Think about those network issues, firewall issues, dependencies and dependency's dependencies, can be a nightmare to a new commer.

What's worse, you may ask your teammates to start your project by running Unix-like commands, but a new member is using a Windows PC.

## Easier and Faster Onboarding

All the problems above can be solve by using Dev Containers.

If you are a backend developer, or you have experience on containers like Docker, Dev Containers is nothing new to you!

Even if you never used containers before, you don't need to dive deep into the concepts because using Dev Containers in VS Code is very simple with no requirement of understanding what is Docker.

Here is what a new comer needs to do to involve himself/herself to your developement team:

Pick what ever machine or system you like, Mac, Windows, Ubuntu, don't matter!

Install Docker on the machine (without asking what Docker is), super easy.

Install VS Code, just 2 to 3 clicks?

Download/Clone the project.

Open the project in VS Code, follow the prompt to build and enjoy the development!

## What is Dev Container

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

## Steps for Dev Containers

I have several guides on how to set up and use Dev Container, check out one by one!

- Part 1: Basic Setups and Usage
- Part 2: Image, Features, Workspace, Environment Variables
- Part 3: Full Stack Dev - Docker Compose & Database
- Part 4: Remote Dev - Develop on a Remote Docker Host
- Part 5: Multiple Projects & Shared Container Configure

## Appendix: Related Docs

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
