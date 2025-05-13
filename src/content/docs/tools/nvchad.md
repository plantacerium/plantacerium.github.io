---
title: NvChad
---

## Use case
Code Editor. Full keyboard. Search. Autocompletions. Suggestions. Much more...

## Set up
````bash
# Download nvim-linux-x86_64.tar.gz

tar xzvf nvim-linux-x86_64.tar.gz

# Run 
./nvim-linux-x86_64/bin/nvim

unzip JetBrainsMono.zip -d ~/.local/share/fonts/

fc-cache -vf ~/.local/share/fonts/

fc-list : family style | grep -i nerd

# Ripgrep install to use with telescope (a fuzzy finder over lists) or in simple terms (search files and code).
sudo dnf install ripgrep

git clone https://github.com/NvChad/starter ~/.config/nvim && nvim

#Inside neovim
:MasonInstall
````

## Advantage?
* NeoVim provides the minimal setup, making available to you the choice to customize all with scripts, and plugins.
* NvChad is more straightforward to use that start from zero with the neovim configs, still with customization possibilities being available.
