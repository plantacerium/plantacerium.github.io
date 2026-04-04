/**
 * Author Configuration and Utility Functions
 * Centralizes all author/creator type configurations for consistent styling
 */

export const authorConfig = {
  'Humano': {
    aura: 'aura-human',
    auraClass: 'text-caramel',
    color: '#d4a373',
    colorRgb: '212, 163, 115',
    glowOpacity: 0.15,
    icon: '☕'
  },
  'LLM': {
    aura: 'aura-llm',
    auraClass: 'text-ai-purple',
    color: '#8b5cf6',
    colorRgb: '139, 92, 246',
    glowOpacity: 0.15,
    icon: '🤖'
  },
  'SSM': {
    aura: 'aura-ssm',
    auraClass: 'text-ai-cyan',
    color: '#00f2ff',
    colorRgb: '0, 242, 255',
    glowOpacity: 0.15,
    icon: '⚡'
  },
  'Híbrido': {
    aura: 'aura-hybrid',
    auraClass: 'text-gradient',
    color: 'gradient',
    colorRgb: '212, 163, 115, 0, 242, 255',
    glowOpacity: 0.1,
    icon: '🔮'
  }
} as const;

export type AuthorType = keyof typeof authorConfig;

/**
 * Get the aura CSS class for card hover effects
 * @param author - The author type string
 * @returns The aura CSS class name
 */
export const getAuthorAura = (author: string): string => {
  return authorConfig[author as AuthorType]?.aura ?? 'aura-neutral';
};

/**
 * Get the text color CSS class for author display
 * @param author - The author type string
 * @returns The text color CSS class name
 */
export const getAuthorClass = (author: string): string => {
  return authorConfig[author as AuthorType]?.auraClass ?? 'text-starlight';
};

/**
 * Get the author color value
 * @param author - The author type string
 * @returns The hex color or 'gradient' for hybrid
 */
export const getAuthorColor = (author: string): string => {
  return authorConfig[author as AuthorType]?.color ?? '#f8fafc';
};

/**
 * Get the author RGB color values for rgba() usage
 * @param author - The author type string
 * @returns The RGB string or default
 */
export const getAuthorColorRgb = (author: string): string => {
  return authorConfig[author as AuthorType]?.colorRgb ?? '248, 250, 252';
};

/**
 * Get the glow opacity for hover effects
 * @param author - The author type string
 * @returns The opacity value (0-1)
 */
export const getAuthorGlowOpacity = (author: string): number => {
  return authorConfig[author as AuthorType]?.glowOpacity ?? 0.1;
};

/**
 * Get the author icon
 * @param author - The author type string
 * @returns The emoji icon
 */
export const getAuthorIcon = (author: string): string => {
  return authorConfig[author as AuthorType]?.icon ?? '⚙️';
};

/**
 * Get all config for an author type
 * @param author - The author type string
 * @returns The complete config object or defaults
 */
export const getAuthorConfig = (author: string) => {
  return authorConfig[author as AuthorType] ?? {
    aura: 'aura-neutral',
    auraClass: 'text-starlight',
    color: '#f8fafc',
    colorRgb: '248, 250, 252',
    glowOpacity: 0.1,
    icon: '⚙️'
  };
};
