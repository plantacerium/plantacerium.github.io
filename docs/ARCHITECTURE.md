# Architecture Documentation

## Overview

This Astro-based template uses a component-driven architecture with content collections, custom remark plugins, externalized data files, and a sophisticated theme system. Built for Astro 6.1.3.

---

## Directory Structure

```
plantacerium.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
│
├── public/
│   └── Plantacerium.png        # Static assets
│
├── src/
│   ├── assets/                # Optimized images
│   │
│   ├── blog/                   # Markdown blog posts
│   │   ├── genesis.md
│   │   └── *.md
│   │
│   ├── blueprints/             # JSON configurations
│   │   └── arquitectura-mamba.json
│   │
│   ├── components/            # Reusable components
│   │   ├── BlogCard.astro
│   │   ├── NeuralPlayer.astro
│   │   ├── OptimizedImage.astro
│   │   └── PagefindSearch.astro
│   │
│   ├── data/                  # Externalized data (easy to customize!)
│   │   ├── portfolio.ts       # Portfolio items
│   │   └── crew.ts           # Crew/toolchain members
│   │
│   ├── layouts/
│   │   └── Layout.astro       # Main page wrapper
│   │
│   ├── pages/                 # Routes
│   │   ├── index.astro       # Homepage
│   │   ├── tripulacion.astro # Toolchain page
│   │   └── blog/
│   │       ├── index.astro   # Blog archive
│   │       └── [slug].astro  # Dynamic post pages
│   │
│   ├── styles/
│   │   └── global.css        # Global styles, themes, accessibility
│   │
│   ├── utils/
│   │   └── author.ts         # Shared author utilities
│   │
│   ├── content.config.ts     # Content collections schema
│   └── env.d.ts             # TypeScript declarations
│
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies
└── docs/                    # Documentation
```

---

## Data Architecture

### Externalized Data Files

**Benefit:** Template users can easily customize content without modifying application code.

#### Portfolio Data (`src/data/portfolio.ts`)

```typescript
export interface PortfolioNode {
  title: string;
  url: string;
  domain: string;
  impact: string;
  category: 'ui' | 'system' | 'zen';
}

export const portfolioNodes: PortfolioNode[] = [/* ... */];
```

#### Crew Data (`src/data/crew.ts`)

```typescript
export interface CrewMember {
  name: string;
  role: string;
  type: string;
  specs: string;
  desc: string;
  tools?: string[];
}

export const crew: CrewMember[] = [/* ... */];
```

---

## Shared Utilities (`src/utils/author.ts`)

Centralized author configuration to avoid code duplication:

```typescript
export const authorConfig = {
  'Humano': { aura: 'aura-human', auraClass: 'text-caramel', ... },
  'LLM': { aura: 'aura-llm', auraClass: 'text-ai-purple', ... },
  'SSM': { aura: 'aura-ssm', auraClass: 'text-ai-cyan', ... },
  'Híbrido': { aura: 'aura-hybrid', auraClass: 'text-gradient', ... },
} as const;

export const getAuthorAura = (author: string): string => {/* ... */};
export const getAuthorClass = (author: string): string => {/* ... */};
export const getAuthorConfig = (author: string) => {/* ... */};
```

---

## Content Collections

### Schema Definition

Located in `src/content.config.ts`:

```typescript
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.enum(['Humano', 'LLM', 'SSM', 'Híbrido']).default('Humano'),
    sector: z.string().default('Core-Engine'),
    rating: z.string().default('5.0/5'),
    readTime: z.number().optional(),
    paragraphs: z.number().optional(),
  }),
});
```

---

## Custom Remark Plugin

### Telemetry Extractor

Located in `astro.config.mjs`:

```javascript
function telemetryExtractor() {
  return function (tree, file) {
    const textContent = toString(tree);
    const words = textContent.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(words / 200);
    const paragraphs = textContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    file.data.astro.frontmatter.readTime = readTimeMinutes;
    file.data.astro.frontmatter.paragraphs = paragraphs;
  };
}
```

---

## Page Routes

### Static Routes

| File | Route | Description |
|------|-------|-------------|
| `index.astro` | `/` | Homepage/Command Hub |
| `tripulacion.astro` | `/tripulacion` | Toolchain showcase |
| `blog/index.astro` | `/blog` | Blog archive |

### Dynamic Routes

`blog/[slug].astro` generates routes for each blog post using `entry.id`.

---

## Component System

### Layout Component (`src/layouts/Layout.astro`)

Provides:
- Skip link for accessibility
- HTML shell with meta tags
- Navigation with ARIA labels
- Footer
- Scanline overlay
- Global CSS import
- View Transitions (ClientRouter)

### BlogCard Component (`src/components/BlogCard.astro`)

Features:
- Author "aura" coloring
- Telemetry stats
- Schema.org markup
- Accessibility attributes
- Shared author utilities

### PagefindSearch Component (`src/components/PagefindSearch.astro`)

Features:
- SEO-friendly full-text search
- Debounced input
- Keyboard accessible
- Mobile responsive
- Works without JavaScript for basic functionality

### OptimizedImage Component (`src/components/OptimizedImage.astro`)

Features:
- Uses Astro's built-in `astro:assets`
- Automatic format optimization (WebP/AVIF)
- Lazy loading by default
- Responsive image generation
- Caption slot support

### NeuralPlayer Component (`src/components/NeuralPlayer.astro`)

Audio-visual component with GSAP animations (available for custom implementations).

---

## Accessibility Architecture

### Skip Links

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

### ARIA Labels

- Navigation: `aria-label="Navegación principal"`
- Search: `aria-label="Buscar en repositorios y bitácoras"`
- Progress: `role="progressbar"`, `aria-valuenow`

### Focus States

```css
a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid var(--accent-main);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## Build System

### Type Checking

```bash
pnpm astro check
```

### Build Configuration

In `astro.config.mjs`:

```javascript
{
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  }
}
```

---

## Astro Configuration

Full config in `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://plantacerium.github.io',
  base: '/',
  
  integrations: [
    mdx(),
    sitemap()
  ],

  markdown: {
    remarkPlugins: [telemetryExtractor],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
```

---

## View Transitions

The template includes built-in View Transitions for smooth page navigation. Implemented via Astro's `<ClientRouter />` component.

### Configuration

Located in `src/layouts/Layout.astro`:

```astro
import { ClientRouter } from 'astro:transitions';

// In head section
<ClientRouter />
```

### Animation System

Custom animations are defined in `Layout.astro` `<style is:global>`:

- `fade` - Smooth fade in/out
- `slide` - Slide from right/left
- `glitch-in` - Cyberpunk-style entrance
- `scale-in` - Scale up animation

### Transition Directives

Pages use `transition:name` and `transition:animate` directives:

```astro
<!-- Named transitions for matching elements -->
<header transition:name="hero-section" transition:animate="fade">

<!-- Slide animation for lists -->
<section transition:name="portfolio-section" transition:animate="slide">

<!-- Card item persistence -->
<article transition:name={`card-${post.id}`}>
```

### Lifecycle Events

Scripts re-initialize after transitions using:

```javascript
document.addEventListener("astro:page-load", () => {
  // Re-run initialization code
});
```

### Accessibility

View Transitions automatically respect `prefers-reduced-motion` via CSS media query.

---

## Search (Pagefind)

The template includes SEO-friendly search powered by Pagefind.

### Configuration

In `astro.config.mjs`:

```javascript
import pagefind from 'astro-pagefind';

integrations: [
  pagefind({
    projectOptions: {
      pageBundler: 'static',
    },
    indexingOptions: {
      sitePath: './dist',
      outputPath: './dist/pagefind',
    },
  }),
]
```

### Search Component

Located at `src/components/PagefindSearch.astro`:

- SEO-friendly (search index is crawled by search engines)
- Works without JavaScript for basic functionality
- Debounced input to reduce server load
- Keyboard accessible (Escape to close)

### Features

- Full-text search across all pages
- Results show title, excerpt, and match highlights
- Categorized results (Blog/Repository)
- Mobile responsive dropdown

### Note

Pagefind index is generated during `pnpm build`. Search is available in production builds only.

---

## Integration Points

### Adding New Content Collections

1. Add to `src/content.config.ts`:

```typescript
const myCollection = defineCollection({
  loader: glob({ pattern: "**/*", base: "./src/my-folder" }),
  schema: z.object({/* ... */}),
});

export const collections = {
  blog: blogCollection,
  myCollection: myCollection,
};
```

### Adding Externalized Data

1. Create `src/data/your-data.ts`:

```typescript
export interface YourData {
  id: string;
  name: string;
}

export const yourData: YourData[] = [/* ... */];
```

2. Import in your page:

```typescript
import { yourData } from '../data/your-data';
```

### Adding Remark Plugins

```bash
pnpm add -D your-plugin
```

```javascript
import yourPlugin from 'your-plugin';

export default defineConfig({
  markdown: {
    remarkPlugins: [telemetryExtractor, yourPlugin],
  },
});
```
