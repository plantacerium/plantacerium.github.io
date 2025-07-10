---
title: Astro Starlight Theme
---

### This site use Astro Starlight Theme.
Relevant insights about my experience soon to be shared.

## Init project
````bash
pnpm create astro --template starlight

# Choose options for project
cd <PROJECT-NAME>

# Start server
pnpm dev

# Build the project
pnpm build
````

## Upgrade

````bash
pnpm dlx @astrojs/upgrade
````

## Embeds

````html
<iframe src="URL" loading="lazy" width="600" height="400"></iframe>
````

Property loading="lazy" is the one that makes the magic to load faster and consume resources only if needed.

````bash
pnpm add astro-embed
````

This package allow to  add rich media from third-party services as: baseline, bluesky, link preview, tweet, vimeo, youtube.
