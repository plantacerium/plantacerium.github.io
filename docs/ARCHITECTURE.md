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
│   │   ├── PagefindSearch.astro
│   │   └── three/             # Three.js Immersive Experience
│   │       ├── ImmersiveCanvas.astro
│   │       ├── LoadingScreen.astro
│   │       ├── CursorTrail.astro
│   │       ├── TiltCard.astro
│   │       └── ParallaxSection.astro
│   │
│   ├── lib/                   # Shared libraries
│   │   ├── three/           # Three.js utilities
│   │   │   ├── particles.ts
│   │   │   └── geometry.ts
│   │   ├── cursor-trail.ts
│   │   └── search.ts       # Fuzzy search utilities
│   │
│   ├── styles/              # Shared styles
│   │   ├── global.css
│   │   └── search-cards.css # Search card styles
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
| `index.astro` | `/` | Homepage with Hero, Search, Portfolio (3-col), Blog (3-col) |
| `tripulacion.astro` | `/tripulacion` | Toolchain showcase |
| `blog/index.astro` | `/blog` | Blog archive (3 columns) |

### Dynamic Routes

`blog/[slug].astro` generates routes for each blog post using `entry.id`.

### Homepage Layout

The homepage is structured as a premium immersive experience:

```
┌─────────────────────────────────────────────────────────┐
│                    HERO SECTION                         │
│  Floating orbs, animated title, decorative rings        │
├─────────────────────────────────────────────────────────┤
│                 SEARCH SECTION                          │
│  Pagefind-powered search across all content             │
├─────────────────────────────────────────────────────────┤
│               PORTFOLIO MATRIX                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │  Project 1  │ │  Project 2  │ │  Project 3  │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  (3 columns, immersive-card effect)                    │
├─────────────────────────────────────────────────────────┤
│                BLOG MATRIX                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │  Post 1    │ │  Post 2     │ │  Post 3     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│  Latest 6 posts (immersive-card effect)                │
├─────────────────────────────────────────────────────────┤
│                    FOOTER                              │
└─────────────────────────────────────────────────────────┘
```

### Responsive Grid System

| Breakpoint | Columns |
|------------|---------|
| > 1200px | 3 columns |
| 768px - 1200px | 2 columns |
| < 768px | 1 column |

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
- **4-Column Grid Results**: Premium card layout for search results
- **3D Immersive Effects**: Transform, glow, and perspective on focus
- **Client-Side Fallback**: Works in both dev and production
- **SEO-friendly**: Powered by Pagefind in production
- **Responsive Grid**: 4 → 3 → 2 → 1 columns at breakpoints
- **Animated Entrance**: Staggered card animations
- **Status Indicator**: Shows search mode (Pagefind vs Client)

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

## Search System

The template includes an atomic search system with fuzzy matching.

### Architecture

```
src/
├── lib/
│   └── search.ts           # Core search logic
├── styles/
│   └── search-cards.css    # Shared card styles
└── components/
    └── PagefindSearch.astro # Search UI
```

### Search Utilities (`src/lib/search.ts`)

Reusable search functions:

```typescript
export interface SearchItem {
  title: string;
  url: string;
  domain?: string;
  category?: string;
  description?: string;
}

export function fuzzySearch(items: SearchItem[], query: string, maxResults?: number)
export function highlightMatch(text: string, query: string): string
export function escapeHtml(text: string): string
```

### Shared Styles (`src/styles/search-cards.css`)

Reusable CSS classes for search result cards:

```css
.search-result-card      /* Card container */
.search-card-link       /* Inner link wrapper */
.search-card-header      /* Header with badge */
.search-card-title       /* Title with highlight support */
.search-card-desc        /* Description with highlight */
```

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

## Three.js Immersive Experience

The template includes a premium 3D immersive experience using Three.js.

### Components

| Component | File | Description |
|-----------|------|-------------|
| `ImmersiveCanvas` | `src/components/three/ImmersiveCanvas.astro` | Main Three.js scene with particles, geometry, and shaders |
| `LoadingScreen` | `src/components/three/LoadingScreen.astro` | Animated loading screen with progress bar |
| `CursorTrail` | `src/components/three/CursorTrail.astro` | Holographic particle cursor trail |
| `TiltCard` | `src/components/three/TiltCard.astro` | 3D hover card with glare effect |
| `ParallaxSection` | `src/components/three/ParallaxSection.astro` | Scroll-based parallax container |

### Features

- **Particle System**: 3000+ animated particles with custom shaders
- **Floating Geometry**: Glass/crystal polyhedrons (icosahedron, octahedron, torus)
- **Nebula Layer**: Distant particle cloud for depth
- **Holographic Grid**: Animated floor grid
- **Energy Rings**: Rotating torus rings
- **Mouse Reactive**: Scene responds to cursor movement
- **Performance Adaptive**: Automatic quality adjustment based on device

### WebGL Detection

Located in `src/utils/webgl.ts`:

```typescript
interface WebGLCapabilities {
  supported: boolean;
  version: number;
  renderer: string;
  vendor: string;
  maxTextureSize: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  performanceLevel: 'high' | 'medium' | 'low';
}

export function detectWebGL(): WebGLCapabilities
export function getParticleCount(level: WebGLCapabilities): number
export function shouldUse3D(effects: WebGLCapabilities): boolean
```

### Performance Levels

| Level | Particles | Geometry Complexity | Target |
|-------|-----------|---------------------|--------|
| High | 5000 | Full | Desktop with dedicated GPU |
| Medium | 2000 | Half | Desktop with integrated GPU |
| Low | 500 | Quarter | Mobile devices |

### TiltCard Component

Creates 3D card hover effect with glare:

```astro
<TiltCard tiltStrength={15} glareOpacity={0.3}>
  <div>Your card content</div>
</TiltCard>
```

### Cursor Trail

Multi-colored particle trail following cursor:

```astro
<CursorTrail enableTrail={true} trailColor="#00f2ff" maxParticles={20} />
```

### Parallax Effects

```astro
<ParallaxSection speed={0.5} direction="vertical">
  <div>Parallax content</div>
</ParallaxSection>
```

### Accessibility

- Automatically disabled for `prefers-reduced-motion`
- Graceful fallback to CSS-only animations
- WebGL not required - falls back to CSS effects
- Mobile optimized with reduced complexity

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
