# Local DevDocs
You run a podman container that executes the Freecodecamp repository DevDocs image for API Browse locally different technology documentations. 

## Repository.
[Repository Freecodecamp Devdocs](https://github.com/freeCodeCamp/devdocs)

## Run command.
```bash
podman run --name devdocs -d -p 9292:9292 ghcr.io/freecodecamp/devdocs:latest
```

## Instructions.
* Access to localhost:9292
* Enable your documentation.
* Install your documentation.
* Backup data with export.

## Sample Export Data
```json
{"docs":"astro/axios/git/gnu_make/go/html/http/javascript/node/npm/python~3.13/react/redux/rust/zig"}
```
