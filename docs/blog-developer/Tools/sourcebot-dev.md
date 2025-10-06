---
title: Sourcebot
---

## Description.
Sourcebot is a self-hosted platform that helps humans and agents answer questions about your code.
* [SourceBot Dev Web](https://www.sourcebot.dev/)
* [Sourcebot Repository](https://github.com/sourcebot-dev/sourcebot)

## Run Sourcebot.

Create a /SourceBot folder, and execute the next command:
```bash
nano config.json
```

Edit, write and save the file:
```json
//config.json
{
    "$schema": "https://raw.githubusercontent.com/sourcebot-dev/sourcebot/main/schemas/v3/index.json",
    "connections": {
        // Comments are supported
        "repos": {
            "type": "github",
            "repos": [
                "sourcebot-dev/sourcebot",
                "plantacerium/plantacerium.github.io"
            ]
        }
    }
}
````
In the same folder where You created config.json, execute the next command:

```bash
podman run -p 3000:3000 --pull=always --rm -v $(pwd):/data:z -e CONFIG_PATH=/data/config.json --name sourcebot ghcr.io/sourcebot-dev/sourcebot:latest
```
* Originally the command use docker, here You use podman.
* To allow podman to create the volume with folders and files add ':z' to transform from '-v $(pwd):/data' to '-v $(pwd):/data:z'.
* This allows Podman to relabel the file or directory with the appropriate SELinux context, enabling access. This step typically needs to be done only once; after relabeling, subsequent runs can omit the :z flag
* Access to localhost:3000
* Follow wizard set up.

You are all set and ready to use Sourcebot Dev.

## Command to Spin SourceBot Dev Next Time
```bash
podman run -d -p 3000:3000 --pull=always --rm -v $(pwd):/data -e CONFIG_PATH=/data/config.json --name sourcebot ghcr.io/sourcebot-dev/sourcebot:latest
```

* Notice that ':z' is not in the command of the second execution.
* You run the container in detach mode fo ease of use.

**Now You completed the Steps.**
