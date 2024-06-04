# Part 1

## Install VS Code

## Install **Docker** on you computer

- Windows PC: Install **Docker Desktop** within a few clicks <https://docs.docker.com/desktop/install/windows-install/>.
- Mac: Install **Docker Desktop** within a few clicks <https://docs.docker.com/desktop/install/mac-install/>.
- Linux PC: Install **Docker Engine** within a few Linux comnands <https://docs.docker.com/engine/install/ubuntu/>.

## Project Setup

```sh
cd your-project-folder && \
mkdir .devcontainer && \
touch .devcontainer/devcontainer.json && \
touch .devcontainer/Dockerfile
```

Copy my `.devcontainer` folder here <https://github.com/graezykev/dev-container/tree/part-1-use-docker-file>:

```sh
git clone -b part-1-use-docker-file https://github.com/graezykev/dev-container.git part-1-use-docker-file
```

## VS Code

`File` -> `Open Folder...` -> Choose **your-project-folder**.

Install the Extension of Dev Containers(`ms-vscode-remote.remote-containers`).

Reopen in Container.

Wait for building (Building (rebuild) may take some time, but ).

Enjoy all Applications and Extensions installed inside the container and unified Settings.

## Configurations Explanation

### Build

`build` -> `dockerfile`

### `workspaceFolder`

`${localWorkspaceFolderBasename}` - `path/to/your-project-folder`

Will explain more at Part 2.

### TLDR: Lifecycle Commands Explanation

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
