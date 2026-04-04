class CursorTrail {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private smoothX: number = 0;
  private smoothY: number = 0;
  
  // Meditation breathing cycle (4 seconds in, 4 seconds out)
  private readonly BREATH_CYCLE = 8000;
  
  // Aura colors
  private readonly AURA_COLORS = [
    { r: 0, g: 242, b: 255, a: 0.15 },   // Cyan - soft
    { r: 139, g: 92, b: 246, a: 0.12 }, // Purple - soft
    { r: 212, g: 175, b: 55, a: 0.1 },  // Gold - soft
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.smoothX = this.mouseX || window.innerWidth / 2;
    this.smoothY = this.mouseY || window.innerHeight / 2;
  }

  private onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  public pause() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public resume() {
    if (!this.isRunning) {
      this.start();
    }
  }

  private calculateBreath(): number {
    // Sine wave for smooth breathing: 0 to 1 to 0
    const time = performance.now() % this.BREATH_CYCLE;
    const breathProgress = time / this.BREATH_CYCLE;
    // Create breath in (0 to 1) and breath out (1 to 0) pattern
    const breath = Math.sin(breathProgress * Math.PI);
    return breath; // 0 to 1
  }

  private animate = () => {
    if (!this.isRunning) return;
    
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    // Smooth interpolation for following
    const smoothing = 0.08;
    this.smoothX += (this.mouseX - this.smoothX) * smoothing;
    this.smoothY += (this.mouseY - this.smoothY) * smoothing;
    
    // Clear canvas completely
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const breath = this.calculateBreath();
    const time = performance.now();
    
    // Draw breathing orbs around cursor
    this.drawBreathingOrbs(breath, time);
    
    // Draw soft aura around cursor
    this.drawAura(breath, time);
  }
  
  private drawBreathingOrbs(breath: number, time: number) {
    const x = this.smoothX;
    const y = this.smoothY;
    
    // Calculate breath size (very slow, meditative)
    const baseSize = 8;
    const breathSize = baseSize + breath * 12; // Expands from 8 to 20
    
    // Draw multiple concentric breathing orbs
    for (let ring = 3; ring >= 1; ring--) {
      const ringScale = ring * 0.6;
      const ringBreath = Math.max(0, breath - (ring - 1) * 0.2);
      const size = breathSize * ringScale * (0.5 + ringBreath * 0.5);
      
      // Color cycles slowly
      const colorIndex = Math.floor(time / 2000) % this.AURA_COLORS.length;
      const color = this.AURA_COLORS[colorIndex];
      
      // Very soft alpha based on breath
      const alpha = color.a * (0.5 + breath * 0.5);
      
      // Create radial gradient for soft orb
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
    
    // Inner bright core (small, steady)
    const coreSize = 4 + breath * 2;
    const coreGradient = this.ctx.createRadialGradient(x, y, 0, x, y, coreSize);
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    coreGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.beginPath();
    this.ctx.arc(x, y, coreSize, 0, Math.PI * 2);
    this.ctx.fillStyle = coreGradient;
    this.ctx.fill();
  }
  
  private drawAura(breath: number, time: number) {
    const x = this.smoothX;
    const y = this.smoothY;
    
    // Large soft aura that breathes
    const auraBaseSize = 60;
    const auraBreath = auraBaseSize + breath * 40; // Expands from 60 to 100
    
    // Slowly rotating colors
    const rotationSpeed = 3000; // 3 seconds per color
    const colorPhase = (time % rotationSpeed) / rotationSpeed;
    
    // Blend between colors
    const color1Index = Math.floor(colorPhase * this.AURA_COLORS.length) % this.AURA_COLORS.length;
    const color2Index = (color1Index + 1) % this.AURA_COLORS.length;
    const blendFactor = (colorPhase * this.AURA_COLORS.length) % 1;
    
    const c1 = this.AURA_COLORS[color1Index];
    const c2 = this.AURA_COLORS[color2Index];
    
    const r = Math.round(c1.r + (c2.r - c1.r) * blendFactor);
    const g = Math.round(c1.g + (c2.g - c1.g) * blendFactor);
    const b = Math.round(c1.b + (c2.b - c1.b) * blendFactor);
    
    // Very subtle aura
    const alpha = 0.08 + breath * 0.06;
    
    // Multiple aura layers for depth
    for (let layer = 0; layer < 3; layer++) {
      const layerSize = auraBreath + layer * 20;
      const layerAlpha = alpha * (1 - layer * 0.3);
      
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, layerSize);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${layerAlpha})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${layerAlpha * 0.5})`);
      gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${layerAlpha * 0.2})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, layerSize, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }
}

export function initCursorTrail(canvasId: string = 'cursor-trail-canvas') {
  document.addEventListener('astro:page-load', () => {
    const existingTrail = (window as any).cursorTrail;
    if (existingTrail) {
      existingTrail.pause();
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    
    if (canvas && !isReducedMotion && !isMobile) {
      const trail = new CursorTrail(canvas);
      (window as any).cursorTrail = trail;
      trail.start();
    }
  });
}

export { CursorTrail };
