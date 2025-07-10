---
title: Podman
---

## Podman
Podman is an OCI compliant container management tool able to run rootless containers. Managing containers without root privileges as a normal use. Podman address security concerns from previous container tools as docker.

## Links Resources
[Podman](https://podman.io/)

## Install
````bash
sudo dnf -y install podman
````

## Podman desktop
````bash
flatpak install flathub io.podman_desktop.PodmanDesktop
# Run podman desktop
flatpak run io.podman_desktop.PodmanDesktop
````
## Sample command
````bash
podman images
````

## Container registries
Default configuration:

* quay.io
* docker.io
Find the configuration here

/etc/containers/registries.conf

## Additional tools

**Buildah**
Build containers images.

**Skopeo**
Analyze images before pulling them

**Youki**
Container runtime written in Rust

