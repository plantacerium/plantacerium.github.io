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

## Language Server Protocol
After install of language servers, config in use:

```toml
# languages.toml
[language-server.astro-ls]
command = "astro-ls"
args = ["--stdio"]
config = {typescript = {tsdk = "/Users/user/.bun/install/global/node_modules/typescript/lib"}, environment = "node"}

[[language]]
name = "astro"
auto-format = true
language-servers = [ "astro-ls" ]

[[language]]
name = "go"
auto-format = true
formatter = { command = "goimports" }

[[language]]
name = "python"
language-servers = ["pyright", "ruff", "pylyzer"]
[language-server.pyright.config.python.analysis]
typeCheckingMode = "basic"
[language-server.ruff]
command = "ruff"
args = ["server"]
[language-server.pylyzer]
command = "pylyzer"
args = ["--server"]

[language-server.rust-analyzer.config.check]
command = "clippy"

[language-server.rust-analyzer.config.cargo]
features = "all"

[language-server.sql-language-server]
command = "sql-language-server"
args = ["up", "--method", "stdio"]

[[language]]
name = "sql"
language-servers = [ "sql-language-server" ]

[[language]]
name = "toml"
formatter = { command = "taplo", args = ["fmt", "-"] }
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
