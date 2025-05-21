---
title: Helix
---
## Use case
Code Editor. Full keyboard. Search. Autocompletions. Suggestions.

## Set up Helix IDE

````bash
flatpak install flathub com.helix_editor.Helix
````

## Links Resources
* [Helix IDE](https://helix-editor.com/)
* [Install languages servers](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations#rust)
* [Youtube Video to activate inline suggestions](https://www.youtube.com/watch?v=muF2A4HC3MI)
* [Youtube Video to activate lazygit](https://www.youtube.com/watch?v=p3qvSz4RJts)

## Open Helix and Config
```bash
hx
:config-open
```

## Config inline suggestions
```toml
# config.toml
theme = "voxed"

[editor]
color-modes = true
end-of-line-diagnostics = "hint"

[editor.inline-diagnostics]
cursor-line = "warning"

[editor.lsp]
display-inlay-hints = true

[keys.normal]
C-g = [":new", ":insert-output lazygit", ":buffer-close!", ":redraw"]
```

## Features Overview
* Multiple selections
* Tree-sitter integration
* Powerful code manipulation
* Language server support
* Built in Rust, for the terminal
* Modern builtin features

## Advantage?
Plug and play, ready to use.
