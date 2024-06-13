# Dev Container - Part 2: Image, Features, Workspace, Environment Variables

In our [last guide](./part-1.md), I introduced a "Quick Start" on how to use a `.devcontainer` and a `devcontainer.json` as well as a `Dockerfile` to configure and build a basic Dev Container.

## Problem

Defining a `Dockerfile` in our `.devcontainer` folder and using it to build a Dev Container can sometimes be very long, especially when you have multiple software to pre-install in the container.

Even though the newcomer only needs to build for the first time, they can still face issues because they are still installing the software while building via a `Dockerfile`.

What's worse, a newcomer is very likely to install a different version of the software which is beyond your expectation.

For example, if we have this line in `Dockerfile`:

```dockerfile
RUN apt-get install -y nodejs
```

They may end up installing different versions of `Node.js` depending on when they are building the container because this command is intended to install the newest LTS version of `Node.s` which is changing all the time.

To address these kinds of issues, I would prefer to provide a relatively fixed "clone" of an environment with a fixed version of software installed, like installing Go lang v1.22.4 in this environment and prevent newcomers from upgrading it unconsciously.

Or, in terms of my last `Node.js` example, I would pre-install multiple versions of the `Node.js` engine in this clone-able environment, and my new teammates only need to switch whichever version between them.

The term for this clone-able environment is "Docker image", or "image".

The newcomer just needs to "clone" (download) an image, and run it like starting an operating system (but much faster), the bottleneck of which will be on the downloading speed of the image.

## Use an Image

What we need to do for the newcomers is build a Docker image from a basic `Dockerfile`, and push the image to a "cloud warehouse" - [Docker Hub](https://hub.docker.com/).

We can regard Docker Hub as a free file server to serve our built, ready-to-use Docker image, and anyone can download the image from it to re-use.

### 1. Build & Push Image

As we have a `Dockerfile` in our [last guide](./part-1.md), building and pushing a Docker image is quite simple, and you also need to sign up for a free account on Docker Hub.

I don't want to go into too much detail here, but if you're not familiar with Docker, check out this [guide to register, build and push](https://github.com/graezykev/docker-build-push-101).

### 2. Configure Image

Specify this image in `devcontainer.json` and remove the `Dockerfile` from it:

```diff
- "build": {
-   "dockerfile": "Dockerfile"
- }
+ "image": "docker.io/your-user-name/your-image-name"
```

> Check out my demo here https://github.com/graezykev/dev-container/blob/part-2-use-image-and-features/.devcontainer/devcontainer.json
> Besides, `"image": "your-user-name/your-image-name"` also works. 

That's all! When our new teammates use "Open in Container" in VS Code to open our project, the image will be auto-downloaded and cloned and started as a Dev Container in their machines.

## Features

Install additional Software.

Add some sprinkles to your ice cream!

<https://containers.dev/features>

## `workspaceMount` & `workspaceFolder`

`${localWorkspaceFolder}`

`${localWorkspaceFolderBasename}`

## Environment Variables

`runArgs`

Use variables inside the container via Linux commands, `Shell` scripts, or `Node.js` etc.
