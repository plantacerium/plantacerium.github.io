# Plantacerium Template - Quick Start Guide

## Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **Package Manager**: pnpm (recommended), npm, or yarn

## Installation

```bash
# Clone or download the template
git clone https://github.com/plantacerium/plantacerium.github.io.git
cd plantacerium.github.io

# Install dependencies
pnpm install
```

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start local dev server at http://localhost:4321 |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm astro check` | Run TypeScript type checking |
| `pnpm astro` | Run Astro CLI commands |

## Project Structure

```
plantacerium.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD for GitHub Pages
│
├── public/
│   └── favicon.svg            # SVG favicon/logo
│
├── src/
│   ├── blog/                   # Blog posts (Markdown/MDX)
│   ├── blueprints/             # JSON configurations for components
│   ├── components/             # Reusable Astro components
│   │   ├── BlogCard.astro      # Blog post card component
│   │   ├── NeuralPlayer.astro  # Audio-visual component
│   │   ├── OptimizedImage.astro # Image optimization (astro:assets)
│   │   ├── PagefindSearch.astro # SEO-friendly search component
│   │   └── three/             # Three.js Immersive Experience
│   │       ├── ImmersiveCanvas.astro
│   │       ├── LoadingScreen.astro
│   │       ├── CursorTrail.astro
│   │       ├── TiltCard.astro
│   │       └── ParallaxSection.astro
│   ├── lib/
│   │   ├── three/             # Three.js utilities
│   │   └── cursor-trail.ts    # Cursor trail logic
│   ├── content.config.ts      # Content collections schema
│   ├── data/                   # Externalized data (easy to customize!)
│   │   ├── portfolio.ts        # Portfolio projects
│   │   └── crew.ts            # Crew/toolchain members
│   ├── layouts/
│   │   └── Layout.astro       # Main layout wrapper
│   ├── pages/
│   │   ├── index.astro        # Homepage (Command Hub)
│   │   ├── tripulacion.astro  # Toolchain showcase
│   │   └── blog/
│   │       ├── index.astro    # Blog archive
│   │       └── [slug].astro  # Dynamic post pages
│   ├── styles/
│   │   └── global.css         # Global CSS and variables
│   └── utils/
│       └── author.ts          # Shared author utilities
│
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies
└── docs/                     # Documentation
```

## First Steps After Installation

1. **Update site configuration** in `astro.config.mjs` (site URL, base path)
2. **Customize personal info** in `src/pages/index.astro` (name, title, social links)
3. **Update portfolio projects** in `src/data/portfolio.ts` (easy JSON-like format)
4. **Update crew data** in `src/data/crew.ts` (toolchain information)
5. **Add your first blog post** in `src/blog/`
6. **Customize colors** in `src/styles/global.css`

## Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 6.1.3 | Static site generator |
| TypeScript | 5.4+ | Type safety |
| Three.js | 0.183 | 3D immersive experience |
| GSAP | 3.12.5 | Animations |
| Pagefind | (bundled) | SEO-friendly search |
| Shiki | (bundled) | Syntax highlighting |

## Key Features

| Feature | Location | Description |
|---------|----------|-------------|
| **Portfolio Data** | `src/data/portfolio.ts` | Add/edit portfolio projects |
| **Crew Data** | `src/data/crew.ts` | Add/edit toolchain members |
| **Author System** | `src/utils/author.ts` | Centralized author configuration |
| **CSS Variables** | `src/styles/global.css` | All theme colors defined here |
| **Pagefind Search** | `src/components/PagefindSearch.astro` | SEO-friendly full-text search |
| **Optimized Images** | `src/components/OptimizedImage.astro` | Image optimization with astro:assets |
| **View Transitions** | `src/layouts/Layout.astro` | Smooth page navigation animations |
| **Three.js 3D Scene** | `src/components/three/` | Premium immersive 3D background |
| **Cursor Trail** | `src/components/three/CursorTrail.astro` | Holographic particle trail |
| **TiltCard** | `src/components/three/TiltCard.astro` | 3D hover card effects |
| **Premium Gold Accents** | `src/styles/global.css` | Gold, rose-gold, platinum colors |
| **Enhanced Glassmorphism** | `src/styles/global.css` | Prismatic, holographic glass variants |

## Troubleshooting

### Port Already in Use

```bash
# Use a different port
pnpm dev -- --port 4322
```

### Type Errors on Build

```bash
# Check for TypeScript errors
pnpm astro check

# Fix errors before building
```

### Clean Build

```bash
# Remove dist folder and rebuild
rm -rf dist && pnpm build
```

---

**See other documentation files in this folder for detailed guides:**
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Change themes, colors, and content
- [CONTENT.md](./CONTENT.md) - Add blog posts and portfolio items
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to various hosting providers
- [THEMING.md](./THEMING.md) - Deep dive into the theme system
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Code organization and structure
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - Implementation status and recommendations
