# Dev Container - Part 3: Full Stack Dev - Docker Compose & Database

This is the third guide of the Dev Container series:

- [Part 0: Dev Container - Why I Need It](./README.md)
- [Part 1: Quick Start - Basic Setups and Usage](./part-1.md)
- [Part 2: Image, Features, Workspace, Environment Variables](./part-2.md)
- Part 3: Full Stack Dev - Docker Compose & Database
- [Part 4: Remote Dev - Develop on a Remote Docker Host](./part-4.md)
- [Part 5: Multiple Projects & Shared Container Configure](./part-5.md)

> Check out my demo for this guide:
>
> ```sh
> git clone -b part-3-use-docker-compose-and-db https://github.com/graezykev/dev-container.git
> ```

Imagine you're developing server applications relying on both `Node.js` and `PostgreSQL`.

You may use installation commands in `Dockerfile` (as we mentioned in [Part 1](./part-1.md)), or, use Dev Container [Features](https://containers.dev/features)  (as we mentioned in [Part 2](./part-2.md)) to install PostgreSQL in your container. Then, have PostgreSQL start automatically when the Docker container is started.

But this can lead to unexpected behaviors if not handled correctly.

For example, if your database startup script exits for any reason, the container will stop unless it ends with an instruction to keep running, such as starting a shell or a daemon process.

## Environment Isolation

A more robust solution for development might involve using `Docker Compose` to manage both your application container and your PostgreSQL service in **separate** containers. It's often better to manage services like databases with separate containers or services, using Docker Compose or similar tools, especially in production environments.

That is to say, use Docker Compose to manage two containers, one for development, and the other one for database. Only install PostgreSQL client on your development container, to connect the PostgreSQL server on the other container.

## I. Compose Configuration

### 0. docker-compose.yml

Creating a Docker Compose configuration file `docker-compose.yml` is the most important part for using multiple containers:

```sh
touch .devcontainer/docker-compose.yml
```

```yml
services:
  app:
    image: docker.io/your-user-name/your-image-name
    volumes:
      - ..:/workspaces/dev-container:cached
    ports:
      - 8001:8000
    # env_file:
    #   - .env # This is a default setting
    #   - ...  # Put other xxx.env files here so you can reference the variables by ${var}, such as ${POSTGRES_HOST}
    environment:
      - POSTGRES_HOST=${POSTGRES_HOST}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    depends_on:
      - postgres

  postgres:
    image: postgres:latest
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data  # Named volume for persisting PostgreSQL data
    ports:
      - 5432:5432

volumes:
  postgres-data:  # Define a named volume for PostgreSQL data persistence

```

It's necessary to explain some basic concepts in this `docker-compose.yml`.

### 1. Define `services`

We define 2 `services` here, each one as a container, now we have container `app` and container `postgres`.

### 2. Specify `image`

We put the image we used in `devcontainer.json` in this configuration file to initiate container `app`.

As to container for the database, I use the official image `postgres:latest`.

### 3. Define `volumes`

### 4. Environment variables

The `docker compose` command line will automatically pick up a file called `.env` in the folder containing the `docker-compose.yml`, that's why I comment out this:

```yml
...
    # env_file:
    #   - .env # This is a default setting
    #   - ...  # Put other xxx.env files here
...
```

Unless you want to use multiple `.env` files, you don't need to specify any other files here.

So, the `runArgs` is no longer needed in `devcontainer.json`, let's get rid of it:

```diff
- "runArgs": [
-   "--env-file",
-   "${localWorkspaceFolder}/.devcontainer/.env"
- ]
```

However, variables in `.env` are not automatically injected to containers, we need to manually pass them for each container:

```yml
services:
  app:
    # ...
    environment:
      - POSTGRES_HOST=${POSTGRES_HOST}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
  postgres:
    # ...
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
```

The `${POSTGRES_PASSWORD}` stands for the `POSTGRES_PASSWORD` you define in `.env`, and so forth.

Here we pass these variables for container `postgres` so it can use them to create a database with the specific database name, user name and password. And we also pass them to container `app` so it can use them to connect to the database in container `postgres`.

> Caveat: `.env`, database usernames, password etc. should handled by CI/CD systems in real scenario.

### 5. Map `ports`

We learned "Forwarding Ports" in Part 1 but this is a bit different.

The `ports` section in a `docker-compose.yml` file allows you to expose ports from the container to the host machine.

You can specify both the host port and the container port (in the format `HOST:CONTAINER`).

The `forwardPorts` section in a `devcontainer.json` file is specific to VS Code Dev Containers.

It allows you to forward ports from inside the container to the local machine.

Unlike `ports`, which expose ports to the host machine, `forwardPorts` only makes them accessible within the container and to linked services.

In some scenarios, we may have container `app`, `app1`, `app2` and their `Node.js` HTTP server are listening to port `8080`, in this way they are actually listening to port `8080` in their own container, from the host machine we can not use `8080` to visit all servers, so we may map the ports like this:

```yml
services:
  app:
    ports:
      - 8001:8080 # Maps port 8001 on the host to port 8080 in the container
  app1:
    ports:
      - 8002:8080 # Maps port 8002 on the host to port 8080 in the container
  app2:
    ports:
      - 8003:8080 # Maps port 8001 on the host to port 8080 in the container
```

In this way, we can use port `8001` (on host machine) to visit container `app`'s port `8080`, use port `8002` to visit container `app1`'s port `8080` ...

![docker compose port mapping](./images/part-3/dev-container-port-mapping.png)

## II. Entry Point

`devcontainer.json`:

```diff
  "name": "Dev Container",
- "image": "docker.io/your-user-name/your-image-name"
+ "dockerComposeFile": [
+   "docker-compose.yml"
+ ],
+ "service": "app",
```

We have a `depends_on` in `docker-compose.yml` that points to container `postgres`, meaning we're going to start `postgres` at the same time with `app`.

## III. Add Database Client (optional)

If you want to use `psql` command line in container `app` to connect to the PostgreSQL server in container `postgres`, we can install PostgreSQL client (but not server) via Dev Container Features in `devcontainer.json`:

```json
  "features": {
    "ghcr.io/robbert229/devcontainer-features/postgresql-client:1": {}
  }
```

```sh
psql -h postgres -U postgres -d postgres
```

![connect to database from app container]()

## IV. Start Full-Stack Development

Every preparing job has been done now let's built the Dev Containers (use VS Code's "Open in Container"), and start our full-stack development.

I have a demo `Node.js` server in [my demo](https://github.com/graezykev/dev-container/blob/part-3-use-docker-compose-and-db/index.js).

This is a program that connects to the database (in another container) with the username and password we pass from `.env`, as well as write new datas into the database every time.

![docker compose environment variables](./images/part-3/dev-container-env-variables-2.png)
