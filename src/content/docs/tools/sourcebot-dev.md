---
title: Sourcebot
---
## Sourcebot dev is for, search in codebases.
[SourceBot](https://www.sourcebot.dev/)

Create file:
````json
//config.json
{
    "$schema": "https://raw.githubusercontent.com/sourcebot-dev/sourcebot/main/schemas/v3/index.json",
    "connections": {
        // Comments are supported
        "repos": {
            "type": "github",
            "repos": [
                "sourcebot-dev/sourcebot"
            ]
        }
    }
}
````
In the same folder where config.json was created execute the following commands

````bash
podman pull ghcr.io/sourcebot-dev/sourcebot:latest

podman images
# COPY Image ID

podman run -p 3000:3000 --name sourcebot "<IMAGE-ID>" --rm -v $(pwd):/data -e CONFIG_PATH=/data/config.json
````

Access to localhost:3000

Currently there is some extra step to research, since the UI starts, however is not indexing the repository.
