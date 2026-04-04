export interface WebGLCapabilities {
  supported: boolean;
  version: number;
  renderer: string;
  vendor: string;
  maxTextureSize: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  performanceLevel: 'high' | 'medium' | 'low';
}

export function detectWebGL(): WebGLCapabilities {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!gl) {
    return {
      supported: false,
      version: 0,
      renderer: 'none',
      vendor: 'none',
      maxTextureSize: 0,
      isMobile,
      prefersReducedMotion,
      performanceLevel: 'low'
    };
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
    : 'Unknown';
  const vendor = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) 
    : 'Unknown';
  const version = gl instanceof WebGL2RenderingContext ? 2 : 1;
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  let performanceLevel: 'high' | 'medium' | 'low' = 'high';
  
  if (isMobile || maxTextureSize < 4096) {
    performanceLevel = 'low';
  } else if (maxTextureSize < 8192 || renderer.toLowerCase().includes('intel')) {
    performanceLevel = 'medium';
  }

  return {
    supported: true,
    version,
    renderer,
    vendor,
    maxTextureSize,
    isMobile,
    prefersReducedMotion,
    performanceLevel
  };
}

export function getParticleCount(level: WebGLCapabilities): number {
  switch (level) {
    case 'high': return 5000;
    case 'medium': return 2000;
    case 'low': return 500;
    default: return 500;
  }
}

export function getGeometryComplexity(level: WebGLCapabilities): number {
  switch (level) {
    case 'high': return 1;
    case 'medium': return 0.5;
    case 'low': return 0.25;
    default: return 0.25;
  }
}

export function shouldUse3D(effects: WebGLCapabilities): boolean {
  return effects.supported && !effects.prefersReducedMotion;
}
