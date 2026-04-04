import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- La pieza clave de la nueva arquitectura

// ============================================================================
// COLECCIÓN: BITÁCORAS (Ahora cargadas desde src/blog)
// ============================================================================
const blogCollection = defineCollection({
  // El loader busca todos los .md y .mdx en la nueva carpeta
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(), // Prevención de errores YAML
    author: z.enum(['Humano', 'LLM', 'SSM', 'Híbrido']).default('Humano'),
    sector: z.string().default('Core-Engine'),
    rating: z.string().default('5.0/5'),
    
    // Telemetría inyectada por tu plugin
    readTime: z.number().optional(),
    paragraphs: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
