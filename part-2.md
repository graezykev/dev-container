# Dev Container - Part 2: Image, Features, Workspace, Environment Variables

- problems
  - Building from a Dockerfile can be very long
    - The bottle neck will be on the downloading of the image
  - You need to rebuild the whole container even if you just want to upgrade one single version in the Dockerfile

## Image

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
