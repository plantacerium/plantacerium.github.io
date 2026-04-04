# Deployment Guide

## GitHub Pages (Recommended)

This template includes automatic deployment via GitHub Actions.

### Setup

1. **Use this template or fork the repository**

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

3. **Push to main branch** - Deployment triggers automatically

### Workflow File

The deployment is configured in `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:  # Allows manual trigger
```

### Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `public/` folder with your domain:
   ```
   yourdomain.com
   ```

2. Configure in GitHub Pages settings

---

## Netlify

### Method 1: Drag & Drop

1. Run `pnpm build`
2. Drag the `dist/` folder to Netlify dashboard

### Method 2: Git Integration

1. Connect your Git repository to Netlify
2. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`

### netlify.toml

Create `netlify.toml` in root:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables

If you need environment variables:

1. Go to Site Settings → Environment Variables
2. Add your variables
3. Access in code: `import.meta.env.VARIABLE_NAME`

---

## Vercel

### vercel.json

Create `vercel.json` in root:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

### Via Git Integration

1. Import project to Vercel
2. Framework Preset: Astro (auto-detected)
3. Build Command: `pnpm build`
4. Output Directory: `dist`

---

## Cloudflare Pages

### Configuration

1. Connect repository to Cloudflare Pages
2. Build configuration:
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Node.js version: 20

---

## Self-Hosted (Traditional Server)

### Build

```bash
pnpm build
```

### Serve with Various Options

```bash
# Using npx serve
npx serve dist

# Using Python
python -m http.server 8080 -d dist

# Using Nginx (example config)
server {
    listen 80;
    root /var/www/site/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Troubleshooting

### 404 on Page Refresh (SPA-style routing)

Add a `_redirects` file to `public/`:

```txt
/*    /index.html   200
```

### Asset Paths Not Loading

Ensure `astro.config.mjs` has correct base path:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  base: '/',  // or '/your-base-path/'
});
```

### Type Errors on Build

```bash
# Run type checking first
pnpm astro check

# Fix any TypeScript errors before deploying
```

---

## CI/CD Best Practices

### Preview Deployments

For pull requests, set up preview deployments:

```yaml
# .github/workflows/preview.yml
name: Preview Deploy

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod=false
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
```

### Branch-Specific Deployments

Configure different deployments for different branches:

```yaml
on:
  push:
    branches:
      - main      # Deploys to production
      - develop    # Deploys to staging
```

---

## Performance Considerations

### Build Size

```bash
# Check build output size
pnpm build
du -sh dist/
```

### Pre-rendering

All pages are statically pre-rendered by default, ensuring fast load times.

### Asset Optimization

Astro automatically:
- Minifies HTML, CSS, and JavaScript
- Inlines small stylesheets
- Optimizes asset paths

### Pagefind Search Index

After building, the Pagefind search index is generated at `dist/pagefind/`. Ensure this directory is included in your deployment.

For static hosting, the search index is automatically included since it's generated during the build process.
