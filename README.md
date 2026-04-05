# Plantacerium

**A premium Astro 6 template for digital architects and consciousness engineers.**

An immersive, high-performance portfolio and blog template featuring Three.js 3D effects, glassmorphism, biofluid animations, fuzzy search, and a stunning constellation background for mobile devices.

## Features

### Performance & Optimization

- **Astro Islands Architecture** - Selective hydration for optimal performance
- **Prefetch Strategy** - Viewport-based prefetching for instant navigation
- **Code Splitting** - Automatic chunking for Three.js and GSAP
- **CSS Minification** - Terser-based minification with console stripping
- **HTML Compression** - Built-in HTML compression
- **Responsive Images** - Optimized with `astro:assets`

### Visual Effects

| Feature | Description |
|---------|-------------|
| **3D Immersive Canvas** | Three.js scene with particles, nebula, floating geometries, and energy rings |
| **Biofluid Blob Animation** | CSS morphing blobs with layered gradients and glow effects |
| **Constellation Background** | SVG-generated mobile-only constellation with randomized nodes |
| **Holographic Cards (8K)** | Ultra-high-fidelity cards with volumetric shadows, animated gradient borders, and nested 3D depth |
| **Glassmorphism** | Multiple glass variants (light, heavy, prismatic, gold, holographic) |
| **Cursor Trail** | Holographic particle cursor trail with color cycling |
| **Tilt Cards** | 3D tilt effect with glare on hover |

### Mobile Experience

- **Hamburger Menu** - Animated hamburger with smooth open/close transitions
- **Constellation Background** - Lightweight SVG alternative to Three.js canvas
- **Touch Optimized** - 44px minimum touch targets
- **Particle Deactivation** - Three.js canvas hidden on mobile for performance
- **Responsive Grid** - 3 → 2 → 1 column layout with smooth transitions

### Search & Navigation

- **Fuzzy Search** - Real-time search across portfolio nodes and blog articles
- **4-Column Results Grid** - Responsive card layout with 3D hover effects
- **Pagefind Integration** - SEO-friendly full-text search (optional)
- **View Transitions** - Smooth page transitions with custom animations

### Accessibility

- **Skip Links** - Keyboard navigation support
- **ARIA Labels** - Comprehensive accessibility attributes
- **Prefers Reduced Motion** - Respects user motion preferences
- **Focus States** - Visible focus indicators for keyboard users
- **Semantic HTML** - Proper heading hierarchy and landmarks

## Quick Start

```bash
# Clone the repository
git clone https://github.com/plantacerium/plantacerium.github.io.git
cd plantacerium.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
plantacerium.github.io/
├── public/
│   ├── Plantacerium.png
│   └── Plantacerium.svg
├── src/
│   ├── components/
│   │   ├── three/
│   │   │   ├── AnimatedBorder.astro     # Animated gradient borders
│   │   │   ├── BiofluidBlob.astro      # Morphing blob animation
│   │   │   ├── ConstellationBackground.astro  # Mobile SVG constellations
│   │   │   ├── CursorTrail.astro       # Holographic cursor trail
│   │   │   ├── ImmersiveCanvas.astro    # Three.js 3D scene
│   │   │   ├── LoadingScreen.astro      # Initial loading screen
│   │   │   ├── ParallaxLayer.astro     # Parallax depth layers
│   │   │   └── TiltCard.astro          # 3D tilt card effect
│   │   ├── BlogCard.astro              # Blog post cards
│   │   ├── NeuralPlayer.astro           # Neural network visualizer
│   │   ├── OptimizedImage.astro         # Optimized image component
│   │   ├── PagefindSearch.astro         # Fuzzy search component
│   │   └── SearchResultCard.astro       # Search result cards
│   ├── content/
│   │   ├── blog/                       # Blog posts (Markdown/MDX)
│   │   └── config.ts                   # Content collections config
│   ├── data/
│   │   ├── crew.ts                     # Crew/toolchain data
│   │   └── portfolio.ts                 # Portfolio nodes data
│   ├── layouts/
│   │   └── Layout.astro                # Main layout with navigation
│   ├── lib/
│   │   ├── search.ts                   # Search utilities
│   │   └── three/
│   │       ├── geometry.ts             # Three.js geometries
│   │       └── particles.ts            # Three.js particle systems
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro             # Blog listing
│   │   │   └── [slug].astro            # Blog post template
│   │   ├── index.astro                 # Homepage
│   │   └── tripulacion.astro           # Crew page
│   ├── styles/
│   │   ├── global.css                  # Global styles & CSS variables
│   │   └── search-cards.css            # Search card styles
│   └── utils/
│       └── author.ts                   # Author utilities
├── astro.config.mjs
├── package.json
└── README.md
```

## Customization

### CSS Variables

All design tokens are defined in `src/styles/global.css`:

```css
:root {
  /* Colors */
  --bg-base: #050507;
  --accent-main: #00f2ff;
  --accent-secondary: #8b5cf6;
  --accent-warm: #d4a373;
  
  /* Typography */
  --font-mono: 'Fira Code', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Orbitron', var(--font-sans);
  
  /* Effects */
  --glass-blur: blur(16px);
  --border-radius-lg: 16px;
  /* ... */
}
```

### Content Data

Portfolio items are defined in `src/data/portfolio.ts`:

```typescript
export const portfolioNodes = [
  {
    title: "Project Name",
    description: "Description",
    domain: "Domain",
    category: "zen" | "system" | "ui" | "blog",
    impact: "Impact statement",
    url: "https://...",
    stars: 100,
    language: "TypeScript",
    color: "#00f2ff"
  },
  // ...
];
```

Blog posts are managed through Astro Content Collections in `src/content/blog/`.

### Author Configuration

Authors are configured in `src/utils/author.ts`:

```typescript
const authors = {
  'Plantacerium': {
    name: 'Plantacerium',
    type: 'human',
    color: '#d4a373',
    icon: '☕',
    // ...
  }
};
```

## Components

### Card Variants

| Class | Description |
|-------|-------------|
| `.glass-panel` | Basic glassmorphism |
| `.glass-panel-heavy` | Heavy glass effect |
| `.glass-panel-prismatic` | Prismatic shimmer |
| `.glass-panel-gold` | Gold accents |
| `.glass-panel-holographic` | Animated holographic |
| `.biofluid-glass` | Living organic effect |
| `.immersive-card` | Biofluid + 2.5D + glow |
| `.hologram-card-8k` | Ultra-high-fidelity 8K |
| `.liquid-glass` | Liquid shimmer effect |
| `.card-2-5d` | 2.5D depth card |

### Utility Classes

| Class | Description |
|-------|-------------|
| `.text-glow-cyan` | Cyan text glow |
| `.text-glow-gold` | Gold text glow |
| `.text-premium-gradient` | Premium gradient text |
| `.text-cosmic-gradient` | Cosmic gradient text |
| `.glow-cyan` | Cyan box shadow |
| `.glow-purple` | Purple box shadow |
| `.glow-gold` | Gold box shadow |
| `.aura-human` | Human author aura |
| `.aura-llm` | LLM author aura |
| `.aura-ssm` | SSM author aura |

## Performance Tips

1. **Use Islands** - Add `client:visible` to heavy components that should only load when in viewport
2. **Optimize Images** - Use the `<OptimizedImage />` component for all images
3. **Lazy Loading** - Three.js and GSAP are code-split automatically
4. **Prefetch** - Navigation prefetching is enabled by default

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Credits

Built with [Astro 6](https://astro.build), [Three.js](https://threejs.org), and [GSAP](https://greensock.com).