# Content Management

## Blog Posts

### Creating a New Post

Create a new `.md` or `.mdx` file in `src/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for the card"
date: 2024-01-15
author: "Humano"          # Options: Humano, LLM, SSM, Híbrido
sector: "Core-Engine"     # Your category
rating: "5.0/5"           # Rating scale
---

# Your Content Here

Your blog post content in Markdown...
```

### Frontmatter Schema

All fields are defined in `src/content.config.ts`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Brief summary for cards |
| `date` | date | Yes | Publication date (YYYY-MM-DD) |
| `author` | enum | No | Creator type (default: Humano) |
| `sector` | string | No | Category (default: Core-Engine) |
| `rating` | string | No | Rating (default: 5.0/5) |
| `readTime` | number | Auto | Calculated by telemetry plugin |
| `paragraphs` | number | Auto | Calculated by telemetry plugin |

### Author Types

| Value | Description | Visual Aura |
|-------|-------------|-------------|
| `Humano` | Human-written content | Caramel/warm tones |
| `LLM` | AI language model content | Purple tones |
| `SSM` | State space model content | Cyan tones |
| `Híbrido` | Human-AI collaboration | Gradient effect |

---

## MDX Features

You can use Astro components in `.mdx` files:

```mdx
---
title: "Post with Components"
---

import MyComponent from '../components/MyComponent.astro';
import CodeBlock from '../components/CodeBlock.astro';

# Post Title

<MyComponent prop="value" />

Regular markdown content...

<CodeBlock language="typescript">
const example = "Hello";
</CodeBlock>
```

---

## Portfolio Items

### Adding Projects

Edit the `portfolioNodes` array in `src/data/portfolio.ts`:

```typescript
import { portfolioNodes } from '../data/portfolio';

// Or add new items:
const newProject = {
  title: "Project Name",               // Display title
  url: "https://github.com/...",      // Link to repo/site
  domain: "Category Domain",           // Short category name
  impact: "Impact statement",          // Brief description
  category: "ui|system|zen"           // Theme color category
};

export const portfolioNodes = [...portfolioNodes, newProject];
```

### Category Icons

| Category | Icon | Border on Hover |
|----------|------|-----------------|
| `ui` | 🌌 | Pink (#f472b6) |
| `system` | ⚡ | Cyan (#00f2ff) |
| `zen` | 🧘‍♂️ | Caramel (#d4a373) |

---

## Crew/Toolchain Data

Edit `src/data/crew.ts`:

```typescript
import { crew } from '../data/crew';

// Or add new members:
const newMember = {
  name: "Tool Name",
  role: "Role Description",
  type: "human|llm|ssm|google|python|rust|js|database|meta-ai|tool",
  specs: "Technology specifications",
  desc: "Description of the tool",
  tools: ["Tool1", "Tool2"]  // Optional array
};

export const crew = [...crew, newMember];
```

### Available Type Values

| Type | Icon/Glow | Use Case |
|------|-----------|----------|
| `human` | Caramel | Human team members |
| `llm` | Purple | LLM integrations |
| `ssm` | Cyan | State space models |
| `google` | Cyan | Google AI tools |
| `python` | Cyan | Python stack |
| `rust` | Cyan | Rust/performance |
| `js` | Cyan | JavaScript/frontend |
| `database` | Cyan | Data storage |
| `meta-ai` | Cyan | AI reasoning tools |
| `tool` | Cyan | Other tools |

---

## Images and Assets

### Adding Images to Posts

1. Place images in `public/` folder
2. Reference with absolute path: `/your-image.png`

```markdown
![Alt text](/your-image.png)
```

### Recommended Image Sizes

| Use Case | Recommended Size |
|----------|-----------------|
| Favicon | 512x512 PNG |
| Social share | 1200x630 PNG |
| Blog header | 1200x600 JPG |
| Inline images | 800px width max |

---

## Auto-Generated Metadata

The telemetry plugin automatically calculates:

- **readTime**: `words / 200 WPM` (average reading speed)
- **paragraphs**: Count of text blocks separated by blank lines

These values are displayed in:
- Blog cards (`src/components/BlogCard.astro`)
- Blog post pages (`src/pages/blog/[slug].astro`)
- Blog archive (`src/pages/blog/index.astro`)

---

## Content Organization

### Sorting Posts

Posts are sorted by date (newest first) in the archive:

```typescript
const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
```

### Filtering Posts

You can filter by any frontmatter field:

```typescript
const humanPosts = posts.filter(post => post.data.author === 'Humano');
const llmPosts = posts.filter(post => post.data.author === 'LLM');
```

### Draft Posts

To exclude posts from production build, add a draft field:

```markdown
---
title: "Draft Post"
draft: true
---
```

Then filter in your pages:

```typescript
const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```
