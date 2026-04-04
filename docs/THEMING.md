# Theming System

## CSS Variables Architecture

### Base Theme (Space)

The default theme is defined in `src/styles/global.css`:

```css
:root {
  /* === Geometry === */
  --sidebar-width: 380px;
  --glass-blur: blur(16px);
  --border-radius-lg: 16px;
  --border-radius-md: 12px;
  --border-radius-sm: 6px;
  
  /* === Transitions === */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
```

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-base: #050507;                    /* Main background */
  --panel-bg: rgba(15, 15, 20, 0.65);    /* Glass panel */
  
  /* Text Colors */
  --text-primary: #f8fafc;     /* Headings, important text */
  --text-secondary: #94a3b8;   /* Body text */
  --text-muted: #475569;      /* Disabled, hints */
  
  /* Accents */
  --accent-main: #00f2ff;     /* Primary cyan */
  --accent-glow: rgba(0, 242, 255, 0.3);  /* Glow effect */
  --accent-secondary: #8b5cf6; /* Secondary purple */
  --accent-warm: #d4a373;     /* Warm caramel */
}
```

---

## Theme Switching

### Available Themes

| Theme | Description | Trigger |
|-------|-------------|---------|
| **Space** (default) | Dark with cyan accents | Default |
| **Quantum** | High-energy purple theme | `body.theme-quantum` |
| **Zen** | Warm meditation theme | `body.theme-zen` |

### Toggle Implementation

In `src/pages/index.astro`:

```javascript
const zenToggle = document.getElementById('zenToggle');
zenToggle?.addEventListener('click', () => {
  document.body.classList.toggle('theme-zen');
  
  const isZen = document.body.classList.contains('theme-zen');
  zenToggle.innerHTML = isZen 
    ? '⚡ Retornar a Alto Rendimiento' 
    : '🧘‍♂️ Activar Modo Zen';
});
```

### Adding New Themes

1. Add CSS class to `src/styles/global.css`:

```css
body.theme-your-theme {
  --bg-base: #your-bg-color;
  --panel-bg: rgba(red, green, blue, 0.7);
  --accent-main: #your-accent;
  --accent-glow: rgba(accent, 0.4);
  --text-secondary: #your-text-color;
}
```

2. Add toggle button in your page:

```html
<button id="yourToggle" class="btn">
  Toggle Your Theme
</button>
```

3. Add JavaScript handler:

```javascript
document.getElementById('yourToggle')?.addEventListener('click', () => {
  document.body.classList.toggle('theme-your-theme');
});
```

---

## Glassmorphism System

### Base Panel Style

```css
.glass-panel {
  background: var(--panel-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--panel-border);
  border-radius: var(--border-radius-md);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

### Customizing Glass Effect

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);  /* Adjust opacity */
  backdrop-filter: blur(20px);            /* Adjust blur amount */
  border: 1px solid rgba(255, 255, 255, 0.1);  /* Border opacity */
}
```

### Glass Panel Examples

```css
/* Strong glass effect */
.panel-heavy {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Subtle glass effect */
.panel-subtle {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.03);
}
```

---

## Author "Aura" System

Color-coding by content creator type:

### CSS Classes

```css
/* Human - Warm tones */
.text-caramel { color: #d4a373; }
.aura-human:hover {
  border-color: var(--coffee-caramel);
  box-shadow: 0 8px 30px rgba(212, 163, 115, 0.15);
}

/* LLM - Purple */
.text-ai-purple { color: #8b5cf6; }
.aura-llm:hover {
  border-color: var(--ai-purple);
  box-shadow: 0 8px 30px rgba(138, 43, 226, 0.15);
}

/* SSM - Cyan */
.text-ai-cyan { color: #00f2ff; }
.aura-ssm:hover {
  border-color: var(--ai-cyan);
  box-shadow: 0 8px 30px rgba(0, 242, 254, 0.15);
}

/* Hybrid - Gradient */
.text-gradient { 
  background: linear-gradient(90deg, var(--accent-main), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### JavaScript Implementation

```typescript
const getAuthorAura = (authorType: string): string => {
  const auras: Record<string, string> = {
    'Humano': 'aura-human',
    'LLM': 'aura-llm',
    'SSM': 'aura-ssm',
    'Híbrido': 'aura-hybrid',
  };
  return auras[authorType] || 'aura-neutral';
};

const getAuthorClass = (authorType: string): string => {
  const classes: Record<string, string> = {
    'Humano': 'text-caramel',
    'LLM': 'text-ai-purple',
    'SSM': 'text-ai-cyan',
    'Híbrido': 'text-gradient',
  };
  return classes[authorType] || 'text-starlight';
};
```

---

## Animations

### View Transitions (Page Navigation)

View Transitions are built-in for smooth page navigation. See `ARCHITECTURE.md` for details.

### Entry Animations (GSAP)

In `src/pages/index.astro`:

```javascript
// Hero section reveal
gsap.fromTo(".gs-reveal",
  { y: 30, opacity: 0, filter: "blur(5px)" },
  { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.2 }
);

// Card grid animation
gsap.fromTo(".gs-node",
  { scale: 0.95, opacity: 0, y: 20 },
  { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.4 }
);
```

### Custom Keyframes

```css
@keyframes your-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Scanline Effect

The scanline effect is in `global.css` (lines 261-284). To customize:

```css
.scanline {
  opacity: 0.6;           /* Adjust intensity */
  background-size: 100% 8px;  /* Adjust line spacing */
}

@keyframes scan {
  0% { background-position: 0 -100vh; }
  100% { background-position: 0 100vh; }
}
```

### Accessibility: Reduce Motion

Animations are automatically reduced for users with `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Responsive Breakpoints

```css
/* Large desktop: 4 columns */
@media (max-width: 1400px) {
  .node-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Tablet landscape: 3 columns */
@media (max-width: 1024px) {
  .node-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablet portrait: adjustments */
@media (max-width: 768px) {
  .architect-title { font-size: 2.5rem; }
  .filter-controls { flex-direction: column; }
}

/* Mobile: 1 column */
@media (max-width: 600px) {
  .node-grid { grid-template-columns: 1fr; }
}
```

---

## Typography Customization

### Font Stack

```css
:root {
  --font-mono: 'Fira Code', 'JetBrains Mono', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Orbitron', var(--font-sans);
}
```

### Text Gradient Effect

```css
.text-gradient {
  background: linear-gradient(90deg, var(--accent-main), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Mono Tag Style

```css
.mono-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--accent-main);
  text-transform: uppercase;
}
```
