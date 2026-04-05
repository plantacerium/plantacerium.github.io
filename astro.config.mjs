import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { toString } from 'mdast-util-to-string';

/**
 * PLUGIN PERSONALIZADO DE REMARK (Telemetría Automática)
 * Como arquitecta, automatizas la extracción de metadatos.
 * Esto escanea el AST (Abstract Syntax Tree) de cada Markdown/MDX.
 */
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

export default defineConfig({
  site: 'https://plantacerium.github.io',
  base: '/',
  integrations: [
    mdx(),
    sitemap(),
    pagefind({
      projectOptions: {
        pageBundler: 'static',
      },
      indexingOptions: {
        sitePath: './dist',
        outputPath: './dist/pagefind',
      },
    }),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
    linkHTMLAttributes: {
      rel: 'prefetch',
      fetchpriority: 'high',
    },
  },

  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ['three', 'gsap'],
    },
  },

  markdown: {
    remarkPlugins: [telemetryExtractor],
    
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },

  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },

  server: {
    port: 4321,
    host: true,
  },

  compressHTML: true,
});
