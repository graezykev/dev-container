# Dev Container - Part 5: Multiple Projects & Shared Container Configure

This is the fifth guide of the Dev Container series:

- [Part 0: Dev Container - Why I Need It](./README.md)
- [Part 1: Quick Start - Basic Setups and Usage](./part-1.md)
- [Part 2: Image, Features, Workspace, Environment Variables](./part-2.md)
- [Part 3: Full Stack Dev - Docker Compose & Database](./part-3.md)
- [Part 4: Remote Dev - Develop on a Remote Docker Host](./part-4.md)
- Part 5: Multiple Projects & Shared Container Configure

I suggest you clone [my demo](https://github.com/graezykev/dev-container/tree/part-5-shared-configure-for-multiple-projects) for this guide:

```sh
git clone -b part-5-shared-configure-for-multiple-projects https://github.com/graezykev/dev-container.git
```

Alternatively, you can also use GitHub's Codespaces to run my demo (switch to branch `part-5-shared-configure-for-multiple-projects`):

![Run demo in Codespaces](./images/part-5/run-in-codespaces.png)!

## Introduction

The `dockerComposeFile` property specifies the paths to one or more Docker Compose files. When building the dev container, the `docker-compose` command runs using the **first path** specified in the array.
