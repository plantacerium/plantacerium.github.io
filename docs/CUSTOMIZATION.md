# Customization Guide

## Changing Site Identity

### Site Title and Description

Edit `src/layouts/Layout.astro`:

```astro
const { 
  title, 
  description = "Your custom description here" 
} = Astro.props;
```

### Author/Personal Information

In `src/pages/index.astro`:

```astro
// Hero section
<h1 class="architect-title">Your Name</h1>
<h2 class="architect-subtitle text-gradient">Your Title</h2>
<p class="manifesto">
  Your personal manifesto or description...
</p>
```

### Toolchain Badges

```astro
// src/pages/index.astro
<div class="toolchain-tags">
  <span class="badge">AI/LLM</span>
  <span class="badge">YOUR STACK</span>
  <span class="badge">ANOTHER SKILL</span>
</div>
```

---

## Portfolio Items

### Easy Way: Edit the Data File

Portfolio items are now externalized to `src/data/portfolio.ts`:

```typescript
// src/data/portfolio.ts
export const portfolioNodes: PortfolioNode[] = [
  {
    title: "Your Project Name",        // Display title
    url: "https://github.com/...",     // GitHub URL
    domain: "Category Domain",         // Short category name
    impact: "Brief description",      // Brief impact statement
    category: "ui|system|zen"          // Visual theme category
  },
  // Add more projects...
];
```

### Category Colors

| Category | Hover Border Color | Icon |
|----------|-------------------|------|
| `ui` | #f472b6 (Pink) | 🌌 |
| `system` | #00f2ff (Cyan) | ⚡ |
| `zen` | #d4a373 (Caramel) | 🧘‍♂️ |

---

## Crew/Toolchain Data

Crew data is externalized to `src/data/crew.ts`:

```typescript
// src/data/crew.ts
export const crew: CrewMember[] = [
  {
    name: "Your Tool Name",
    role: "Role Description",
    type: "human|llm|ssm|google|python|rust|js|database|meta-ai|tool",
    specs: "Technology specifications",
    desc: "Description of the tool",
    tools: ["Tool1", "Tool2"]  // Optional array
  },
];
```

### Available Type Values

| Type | Glow Color |
|------|-----------|
| `human` | Caramel |
| `llm` | Purple |
| Other types | Cyan (default) |

---

## Color System

### CSS Variables

All CSS variables are defined in `src/styles/global.css`:

```css
:root {
  /* Author Aura Colors */
  --coffee-caramel: #d4a373;
  --coffee-crema: #f5f0e8;
  --ai-purple: #8b5cf6;
  --ai-cyan: #00f2ff;

  /* Semantic Colors */
  --starlight: #f8fafc;
  --stardust: #94a3b8;
  --space-matter: #0a0a0f;
  --radius-pill: 9999px;
}
```

### Theme Variations

```css
/* Quantum Theme (High Energy) */
body.theme-quantum {
  --bg-base: #0a0014;
  --accent-main: #c084fc;
}

/* Zen Theme (Meditation) */
body.theme-zen {
  --bg-base: #12100e;
  --accent-main: #d4a373;
}
```

---

## Author System

Author configurations are centralized in `src/utils/author.ts`:

```typescript
// src/utils/author.ts
export const authorConfig = {
  'Humano': {
    aura: 'aura-human',
    auraClass: 'text-caramel',
    color: '#d4a373',
    icon: '☕'
  },
  'LLM': {
    aura: 'aura-llm',
    auraClass: 'text-ai-purple',
    color: '#8b5cf6',
    icon: '🤖'
  },
  // ... more types
};
```

### Available Functions

```typescript
getAuthorAura(author)          // Returns aura CSS class for card hover
getAuthorClass(author)         // Returns text color CSS class
getAuthorColor(author)         // Returns hex color
getAuthorConfig(author)        // Returns complete config object
```

---

## Typography

### Font Variables

```css
:root {
  --font-mono: 'Fira Code', 'JetBrains Mono', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Orbitron', var(--font-sans);
}
```

### Changing Fonts

1. Add Google Fonts link in `src/layouts/Layout.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap" rel="stylesheet">
```

2. Update CSS variable in `global.css`:

```css
:root {
  --font-mono: 'Your Mono Font', monospace;
  --font-display: 'Your Display Font', sans-serif;
}
```

---

## Social Links

Edit in `src/pages/index.astro`:

```astro
<div class="social-grid">
  <a href="https://ko-fi.com/yourusername" class="social-link">☕ Support via Ko-Fi</a>
  <a href="https://discord.gg/yourserver" class="social-link">💬 Discord</a>
</div>
```

---

## Favicon

The template uses an SVG favicon at `public/favicon.svg`. Replace it with your own:
- Recommended format: SVG (scalable)
- Alternative: 512x512 PNG
- Name must remain: `favicon.svg` or `Plantacerium.png`

---

## View Transitions

The template includes smooth page transitions using Astro's View Transitions API.

### How It Works

- Navigation stays smooth between pages
- Elements with matching `transition:name` animate between pages
- Custom animations for different content types

### Customizing Transitions

Edit animations in `src/layouts/Layout.astro` (lines 50-130):

```css
/* Change default page transition */
::view-transition-old(root) {
  animation: fade-out 0.2s ease-out forwards;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-out forwards;
}

/* Custom title animation */
.architect-title {
  view-transition-name: page-title;
}
```

### Available Animations

| Animation | Effect |
|-----------|--------|
| `fade` | Crossfade |
| `slide` | Slide in/out |
| `none` | No animation |
| `glitch-in` | Cyberpunk effect |

### Reducing Motion

Users with `prefers-reduced-motion` automatically get reduced animations.

---

## Search

The template includes an immersive neural search with **fuzzy matching** that filters actual data from `portfolio.ts` and blog collection.

### How It Works

Search uses a custom fuzzy matching algorithm that:
- Searches across title (3x weight), domain (2x), category (1.5x), and description (1x)
- Ranks results by relevance score
- Returns up to 12 best matches
- Highlights matched text in results

### Features

- **4-Column Grid Results**: Search results display as premium cards in a 4-column grid
- **Fuzzy Matching**: Intelligent matching that finds partial and similar terms
- **Weighted Scoring**: Title matches rank higher than description matches
- **Real-time Results**: Debounced input (100ms) for smooth experience
- **Status Indicator**: Shows 🟣 Fuzzy Search Active
- **Immersive 3D Effects**: Cards with hover transforms, glow effects, and staggered animations
- **Responsive**: 4 cols → 3 cols (1200px) → 2 cols (768px) → 1 col (480px)

### Components

| Component | File | Description |
|----------|------|-------------|
| `PagefindSearch` | `src/components/PagefindSearch.astro` | Main search container with input and results |
| `SearchResultCard` | `src/components/SearchResultCard.astro` | Individual result card (reference) |

### Customizing Search

The search automatically includes all data from portfolio and blog. To add more portfolio items:

```typescript
// src/data/portfolio.ts
export const portfolioNodes: PortfolioNode[] = [
  {
    title: "Your Project",
    url: "https://github.com/...",
    domain: "Category",
    impact: "Brief description",
    category: "ui" // ui | system | zen
  }
];
```

### Fuzzy Search Algorithm

The search uses a custom algorithm:

1. **Exact Match**: If query appears in text, score = 1
2. **Partial Match**: For each character match in sequence, score += 1 + consecutive bonus
3. **Weighted Fields**: title (3x), domain (2x), category (1.5x), description (1x)
4. **Sorted Results**: Highest score first, max 12 results

### Atomic Structure

Search functionality is separated into reusable modules:

| File | Purpose |
|------|---------|
| `src/lib/search.ts` | Core fuzzy search logic and types |
| `src/styles/search-cards.css` | Shared search card styles |
| `src/components/PagefindSearch.astro` | Search UI component |

### Result Card Structure

Each search result displays as a card with:
- Icon (📁 for repos, ☕ for blog)
- Type badge (REPO/LOG)
- Title with highlighted matches (cyan)
- Domain/description with highlighted matches (purple)
- "Explore" action with arrow

### Testing Search

```bash
npm run dev
```

Then navigate to http://localhost:4321 and start typing to see fuzzy results filter in real-time.

---

## Accessibility Features

The template includes built-in accessibility features:

### Skip Links
Press `Tab` to reveal "Saltar al contenido principal" link

### Reduced Motion
Users with `prefers-reduced-motion` will see minimal animations

### Focus States
All interactive elements have visible focus indicators

---

## Image Optimization

The template includes an `OptimizedImage` component that uses Astro's built-in `astro:assets` for automatic image optimization.

### Usage

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
import myImage from '../assets/my-photo.jpg';
---

<OptimizedImage
  src={myImage}
  alt="Description of the image"
  width={800}
  height={450}
  loading="lazy"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `ImageMetadata` | Required | Image imported as a module |
| `alt` | `string` | Required | Alt text for accessibility |
| `width` | `number` | 800 | Output width in pixels |
| `height` | `number` | 450 | Output height in pixels |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading strategy |
| `format` | `'webp' \| 'avif' \| 'png' \| 'jpg'` | - | Output format |
| `class` | `string` | - | Additional CSS classes |
| `style` | `string` | - | Inline styles |

### Benefits

- **Automatic optimization**: Converts to WebP/AVIF automatically
- **Responsive images**: Generates multiple sizes
- **Lazy loading**: Default behavior improves performance
- **Format selection**: Choose WebP, AVIF, PNG, or JPG

---

## Biofluid Glassmorphism Effects

The template includes premium biofluid glassmorphism effects for a living, organic feel:

### Available Classes

| Class | Effect |
|-------|--------|
| `.biofluid-glass` | Living glass with animated color rotation |
| `.liquid-glass` | Shimmering liquid surface effect |
| `.card-2-5d` | 2.5D depth card with glow on hover |
| `.immersive-card` | Premium card combining biofluid shimmer + 3D tilt + glow |
| `.panel-3d` | Floating 3D panel with animation |
| `.blob-container` | Morphing blob background |
| `.iridescent-border` | Rainbow-shifting border |

### Usage

```html
<div class="biofluid-glass">
  <div class="biofluid-content">
    Living glass content
  </div>
</div>

<div class="liquid-glass">
  Liquid surface content
</div>

<div class="card-2-5d glass-panel">
  2.5D interactive card
</div>

<div class="immersive-card">
  Premium immersive card with biofluid + 3D effect
</div>

<div class="panel-3d glass-panel">
  Floating 3D panel
</div>
```

### Immersive Card (Recommended)

The `.immersive-card` class is the premium option combining all effects:

```html
<div class="immersive-card">
  <a href="/your-link">
    <h3>Card Title</h3>
    <p>Card description goes here...</p>
  </a>
</div>
```

**Features:**
- Animated conic gradient shimmer
- 3D tilt on hover (rotateX, rotateY)
- Glow shadow effect
- Scale animation on hover
- Cyan/Purple/Gold color palette

### 2.5D Card Effect

```html
<div class="card-2-5d glass-panel">
  <h3>Interactive Card</h3>
  <p>Hover for glow effect</p>
</div>
```

### Depth Layers

```html
<div class="group-depth">
  <div class="depth-layer depth-layer-1">Foreground</div>
  <div class="depth-layer depth-layer-2">Middle</div>
  <div class="depth-layer depth-layer-3">Background</div>
</div>
```

---

## Three.js Immersive Experience

The template includes a premium 3D immersive experience with Three.js.

### Disabling Three.js Features

In `Layout.astro`, modify the ImmersiveCanvas props:

```astro
<ImmersiveCanvas 
  enableParticles={true}
  enableGeometry={true}
  enableNebula={true}
  enableGrid={true}
  enableRings={true}
/>
```

### Adjusting Performance

Edit `src/utils/webgl.ts` to customize particle counts:

```typescript
export function getParticleCount(level: WebGLCapabilities): number {
  switch (level) {
    case 'high': return 5000;    // Desktop
    case 'medium': return 2000;  // Mid-range
    case 'low': return 500;       // Mobile
    default: return 500;
  }
}
```

### Custom Cursor Trail

```astro
<CursorTrail 
  enableTrail={true}
  trailColor="#00f2ff"
  maxParticles={20}
/>
```

### TiltCard for 3D Effects

Wrap any content in a TiltCard for 3D hover effects:

```astro
<TiltCard tiltStrength={15} glareOpacity={0.3}>
  <div class="glass-panel">
    Content with 3D tilt effect
  </div>
</TiltCard>
```

### Parallax Sections

Add depth to sections:

```astro
<ParallaxSection speed={0.5} direction="vertical">
  <section>
    Parallax-enabled content
  </section>
</ParallaxSection>
```

---

## Premium Glassmorphism

The template includes enhanced glassmorphism variants:

### Available Classes

| Class | Description |
|-------|-------------|
| `.glass-panel` | Standard glass effect |
| `.glass-panel-heavy` | Stronger blur and border |
| `.glass-panel-prismatic` | Shimmer rainbow effect |
| `.glass-panel-gold` | Gold-tinted glass |
| `.glass-panel-holographic` | Animated holographic overlay |

### Glow Effects

| Class | Effect |
|-------|--------|
| `.glow-cyan` | Cyan glow |
| `.glow-purple` | Purple glow |
| `.glow-gold` | Gold glow |
| `.glow-rose-gold` | Rose gold glow |

### Premium Text Gradients

```html
<p class="text-premium-gradient">Premium gradient text</p>
<p class="text-cosmic-gradient">Cosmic gradient text</p>
```

---

## Homepage Layout

The homepage features a premium immersive layout with three sections:

### Structure

```html
<main class="max-width-expanded">
  <!-- Hero Section with floating orbs -->
  <section class="hero-section">...</section>
  
  <!-- Search Section -->
  <section class="omni-search-container">...</section>
  
  <!-- Portfolio Grid (3 columns) -->
  <section class="portfolio-matrix">
    <div class="node-grid">
      <!-- Portfolio items -->
    </div>
  </section>
  
  <!-- Blog Section (3 columns) -->
  <section class="blog-matrix">
    <div class="blog-grid">
      <!-- Latest 6 blog posts -->
    </div>
  </section>
</main>
```

### Grid Configuration

| Section | Desktop | Tablet (1200px) | Mobile (768px) |
|---------|---------|-----------------|----------------|
| Portfolio | 3 columns | 2 columns | 1 column |
| Blog | 3 columns | 2 columns | 1 column |
| Gap | 2rem | 2rem | 1.5rem |

### Customizing Cards

Apply the `.immersive-card` class to any card:

```html
<article class="repository-node">
  <div class="card-content immersive-card">
    <!-- Card content -->
  </div>
</article>
```

### Blog Section

The homepage displays the 6 most recent blog posts. To change this:

```astro
<!-- In src/pages/index.astro -->
{posts.slice(0, 6).map((post) => (...))}
```

Change `6` to display more or fewer posts.

---

### Static Page

Create `src/pages/your-page.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Your Page Title">
  <main id="main-content">
    <!-- Your content -->
  </main>
</Layout>
```

---

## Disabling Effects

### Remove Scanline

Add to any page's `<style>` block:

```css
.scanline {
  display: none;
}
```

### Disable Animations for All Users

In `global.css`, find the `prefers-reduced-motion` media query and apply styles globally, or override in your page styles.
