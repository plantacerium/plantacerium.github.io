---
title: List of Resources
---

This index aims to highlight different resources on topics that I explore, read, and practice.

## Data structures:
* [Youtube channel on data structures](https://www.youtube.com/@WilliamFiset-videos)
* Books: Algorithms Illuminated series.

## Desing patterns:

* Web. Front End: [Patterns dev](https://www.patterns.dev/)
* Book Java: Head first design patterns. (The knowledge here it can be applied to other languages)

## Libraries and Tools
* A better dotenv–from the creator of dotenv: [DotEnvX](https://dotenvx.com/docs/)
* View markdown in the terminal [MDLess](https://github.com/ttscoff/mdless)
* Terminal GUI for Git [Lazygit](https://github.com/jesseduffield/lazygit)
* Extend cargo to query cargo crates with command cargo info crate-name, rust crate cargo-info.
```bash
cargo install cargo-info
```
* Terminal, Back to the future, [FishShell](https://fishshell.com/)
```bash
sudo dnf install fish
# Enter in fish shell
fish
```
* Find files with sql like queries [FSelect](https://github.com/jhspetersson/fselect)
* Command line viewer for rustdoc documentation. Rust crate, rusty-man. Note: ahash yanked(outdated) dependency, exploring local builds fix.
```bash
cargo install rusty-man
```
* Cheat sheets and search in browser. [Search Patterns](https://quickref.me/google-search.html)
* Terminal multiplexer, become over powered with this gemstone, [tmux](https://github.com/tmux/tmux/wiki)
* Create presentations in markdown format and run them from your terminal, [presenterm](https://github.com/mfontanini/presenterm)
 ## Snippets

### Watermark images
```bash
// watermark.sh
#!/bin/#!/bin/bash
for i in ./*; do
    composite -dissolve 55% -gravity Center -quality 100 logo.png "$i" "results/$(echo $i | cut -d '/' -f 2)"
done
```
Create the file watermark.sh, inside the folder, and create folder results, inside the same folder, excute file with sh watermark.sh, replace logo.png with your logo.
