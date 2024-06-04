
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
