import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { toString } from 'mdast-util-to-string';

/**
 * PLUGIN PERSONALIZADO DE REMARK (Telemetría Automática)
 * Como arquitecta, automatizas la extracción de metadatos.
 * Esto escanea el AST (Abstract Syntax Tree) de cada Markdown/MDX.
 */
function telemetryExtractor() {
  return function (tree, file) {
    // 1. Extraer el texto puro del árbol de Markdown
    const textContent = toString(tree);
    
    // 2. Calcular la latencia (Tiempo de lectura)
    const words = textContent.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(words / 200); // 200 ppm es el promedio de lectura
    
    // 3. Calcular la densidad de datos (Párrafos)
    // Contamos los saltos de línea dobles que definen un párrafo en Markdown
    const paragraphs = textContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // 4. Inyectar la telemetría en el frontmatter para que Astro lo consuma en las tarjetas
    file.data.astro.frontmatter.readTime = readTimeMinutes;
    file.data.astro.frontmatter.paragraphs = paragraphs;
  };
}

// ============================================================================
// CONFIGURACIÓN PRINCIPAL DE ASTRO
// ============================================================================
export default defineConfig({
  site: 'https://plantacerium.github.io',
  base: '/',
  // Integraciones esenciales
  integrations: [
    mdx(),       // Permite incrustar JSX/Componentes dentro de tus posts
    sitemap()    // Generación automática del mapa estelar (SEO)
  ],

  markdown: {
    // Aplicamos nuestro inyector de telemetría a la tubería de Markdown
    remarkPlugins: [telemetryExtractor],
    
    shikiConfig: {
      // Configuración de resaltado de sintaxis para tus bloques de código
      theme: 'dracula', // Encaja perfecto con los tonos oscuros/neón
      wrap: true,
    },
  },

  // Optimización de la compilación
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },

  // Servidor de desarrollo optimizado
  server: {
    port: 4321,
    host: true,
  }
});
