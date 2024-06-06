# Dev Container - Part 4: Develop on a Remote Docker Host

Here comes my favourite part, **Remote Development**.

In the previous parts we stay in a stand-alone PC to do everything, building dev containers, and developing. In this part I would like to introduce how to develop when you're not at the office or even have no working PC at your disposal.

This is how the VS Code team elaborate on the remote development architecture:

![remote docker host](./images/part-4/server-arch-latest.png)

The VS Code on the left side can be a **native client** installed on your development machine (a desktop, laptop, tablet etc.), or a **VS Code web** you visit in any web browser. This is why I say theoretically you can work everywhere as long as you have a web browser and Internet accessibility.

There're primary two ways of remote development:

- **Connect to remote and virtual machines with Visual Studio Code via SSH**.

- **Connect to a remote machine via a secure tunnel, without configuring SSH**.

I'm going to guide you through the second way, which is simpler, has no lengthy, laborious jobs of installing and configuring SSH server and client, and it enables us to work anywhere without a PC.

I won't elaborate on the concepts of [**Visual Studio Code Server**](https://code.visualstudio.com/docs/remote/vscode-server) although we're leveraging the ability of it.

## Developing with Remote Tunnels

### 0. Prepare

In the paradigm of remote development, we need at least two devices.

One for serving the code and dev environment, we call it a **Remote Machine**.

The other one is for developing, which can be much more lightweight, we call it a **Dev Machine**.

- **Remote Machine**

  It can be your desktop/laptop in your office, it can be a Virtual Machine, and it can also be a cloud machine such as AWS EC2 ...

  In my following guide, I use a Ubuntu Linux server to test.

- **Dev Machine**

  This is another desktop, laptop, iPad, Surface Tablet, Android Tablet, mobile phone ...

  > I list mobile phones here because in reality you can visit VS Code web via a web browser, although no one really wants to do that, just for some super urgent scenarios.

- **GitHub / Microsoft account**

  This is the "bridge" to connect the dev machine to the remote machine via [**Visual Studio Code Server**](https://code.visualstudio.com/docs/remote/vscode-server).

### 1. Install Docker (Remote Machine)

We need to install Docker on the remote machine, however, no need for the dev machine.

I mentioned about installing Docker in [Part 1:](./part-1.md), which is relatively very easy and straightforward, especially when you're using Mac/Windows PC as your remote machine, even if you are using headless systems such as a Ubuntu Linux server, that is also within a few commands.

Once we finish the installation of Docker, we can move on to the next step.

What's interesting is that **you can also skip installing Docker for now**, because actually you can install Docker after step 4 (Connect to Remote Machine), as you'll have a terminal to run shell scripts in this remote machine.

### 2. Install Code CLI (Remote Machine)

Launch the remote machine to download and uncompress VS Code CLI here <https://code.visualstudio.com/#alt-downloads>, according to the operating system of your remote machine.

![download vs code cli](./images/part-4/download-vs-code-cli.png)

As I'm using Ubuntu Linux, I download and uncompress it via the following commands (modify the ):

```sh
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz && \
tar -xf vscode_cli.tar.gz
```

After it's uncompressed you'll find the executable binary file:

![code exec bin](./images/part-4/vs-code-bin.png)

### 3. Create Secure Tunnel (on Remote Machine)

Run the binary file to create a secure tunnel:

```sh
./code tunnel --accept-server-license-terms
```

You'll need some steps to set up the tunnel:

![steps to create a secure tunnel](./images/part-4/create-tunnel-steps.png)

> Here, use the GitHub / Microsoft account I mentioned before.

At last, this CLI will output a **vscode.dev URL** tied to this remote machine, like `https://vscode.dev/tunnel/<machine_name>/<folder_name>`

### 4. Connect to Remote Machine

Connecting to the remote machine from your dev machine I mentioned before, you have 2 options:

> Either way you choose, when you try to connect for the first time, you'll be prompted to log into your Github/Microsoft account at a `https://github.com/login/oauth/authorize...` URL.

- Directly visit the **vscode.dev URL** in a web browser.

  ![visit vscode.dev URL on a web browser](./images/part-4/visit-vscode-url-in-browser.gif)

- Use a VS Code client.

  - 1. Install [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension pack first (search `remote dev`).
  - 2. Use VS Code's `Command Palette` and choose `Connect to Tunnel`.
  - 3. Login and verify with the Github/Microsoft account (you used in the last step).
  - 4. Choose the remote machine name (you created in the last step).
  - 5. Wait for the connection and check the connection.

I recorded the steps below:

![visit vscode.dev URL on a VS Code client](./images/part-4/install-extension-and-visit-remote-machine-in-vscode.gif)

Once the remote machine is connected, on the left bottom corner of VS Code, you can see the name of the remote machine, and you have a control of it in the terminal.

![remote machine and terminal](./images/part-4/tunnel-connected.png)

At this point, we have only connected to this remote machine, in the next step, we're going to use this remote machine to clone codes and build a dev container on top of it so as to enjoy a truly unified dev environment.

As I mentioned in [step 1](#1-install-docker-remote-machine), you can actually install Docker in this tep:

![install docker in remote machine](./images/part-4/tunnel-install-docker.gif)

### 5. Clone your Project

Clone your project (which has a `.devcontainer` folder and its configurations). You can use my project for testing.

```sh
git clone -b part-4-remote-dev https://github.com/graezykev/dev-container.git
```

### 6. Build the Dev Container

> Unfortunately, at the time I write this, we're still unable to build a dev container via **VS Code web**, you need to make this step in a **native VS Code client**.

The container isn't built yet, we're still unable to use the container environment. We need several steps to achieve this:

- 1. Use VS Code's `Open Folder` to open the project.
- 2. Use VS Code's `Command Palette` and choose `Reopen in Container`.
- 3. Wait for the building.

I recorded the steps below:

![open folder and reopen in container and build](./images/part-4/clone-project-and-open-folder-and-reopen-in-container-and-build.gif)

After the container is built, enjoy the dev environment, ports, extensions and settings.

![after container built - port mapping & lifecycle scripts & extensions & settings](./images/part-4/tunnel-after-build.png)

Lifecycle commands in `devcontainer.json` are run after it's built.

The Node.js program is listening to port 8000 on the remote machine's dev container, but the port is mapped to your dev machine so you can visit it through `localhost:8000`

VS Code extensions we specify in `devcontainer.json` are not actually installed on the dev machine, but in the dev container which stands on the remote machine.

![alfter container built - installed softwares](./images/part-4/tunnel-after-build-2.png)

The remote machine has no Node.js or Python installed, but you can enjoy these softwares in the dev container built into this remote machine.

## Work Everywhere

Now you're able to work anywhere you like as long as you have access to the Internet!

You can use a spare laptop (with Windows, Mac or Linux OS) to install a VS Code and connect to the remote machine.

If you don't like to install anything, why don't you just use a tablet device such as iPad to visit the **vscode.dev URL** and start your development.

In some extremely urgent cases, you can even use a mobile phone to visit the **vscode.dev URL** and make some tiny code changes or run some scripts on the remote machine!
