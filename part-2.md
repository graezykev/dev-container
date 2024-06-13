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

Or, in terms of my last `Node.js` example, I would pre-install multiple versions of `Node.js` engine in this clone-able environment, and my new teammates only need to switch whichever version between them.

The term for this clone-able environment is "Docker image", or "image".

The newcomer just needs to "clone" (download) an image, and run it like starting an operating system (but much faster), the bottle-neck of which will be on the downloading speed of the image.

## Build an Image

Build a docker image from `Dockerfile`.

Configure `image` in `devcontainer.json`.

## Features

Install additional Softwares.

<https://containers.dev/features>

## `workspaceMount` & `workspaceFolder`

`${localWorkspaceFolder}`

`${localWorkspaceFolderBasename}`

## Environment Variables

`runArgs`

Use variables inside the container via Linux commands, `Shell` scripts, or `Node.js` etc.
