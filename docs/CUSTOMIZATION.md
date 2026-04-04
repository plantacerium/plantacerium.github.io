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

The template includes Pagefind for SEO-friendly search.

### How It Works

Search is powered by Pagefind which creates a search index during build.

### Customizing Search

Edit `src/components/PagefindSearch.astro` to customize:
- Result appearance
- Number of results shown
- Highlight colors

### Testing Search

Search is only available in production builds:

```bash
pnpm build
pnpm preview
```

Then navigate to http://localhost:4321 and search.

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

## Adding New Pages

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
