export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  disabled?: boolean;
}

export class ParallaxSection {
  private element: HTMLElement;
  private speed: number;
  private direction: 'vertical' | 'horizontal' | 'both';
  private initialTransform: string;
  private ticking: boolean = false;
  private prefersReducedMotion: boolean;

  constructor(element: HTMLElement, options: ParallaxOptions = {}) {
    this.element = element;
    this.speed = options.speed ?? 0.5;
    this.direction = options.direction ?? 'vertical';
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.initialTransform = getComputedStyle(element).transform;
    
    if (this.prefersReducedMotion || options.disabled) {
      return;
    }

    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => this.onScroll(), { passive: true });
  }

  private onScroll() {
    if (this.ticking) return;
    
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
    
    this.ticking = true;
  }

  private update() {
    if (this.prefersReducedMotion) return;

    const rect = this.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    let translateY = 0;
    let translateX = 0;

    if (this.direction === 'vertical' || this.direction === 'both') {
      const center = rect.top + rect.height / 2;
      const distanceFromCenter = center - viewportHeight / 2;
      translateY = distanceFromCenter * this.speed * 0.1;
    }

    if (this.direction === 'horizontal' || this.direction === 'both') {
      const center = rect.left + rect.width / 2;
      const distanceFromCenter = center - viewportWidth / 2;
      translateX = distanceFromCenter * this.speed * 0.05;
    }

    this.element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  }

  public destroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    window.removeEventListener('resize', this.onScroll.bind(this));
    this.element.style.transform = this.initialTransform;
  }
}

export function initParallax(selector: string = '[data-parallax]') {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    const el = element as HTMLElement;
    const speed = parseFloat(el.dataset.parallaxSpeed || '0.5');
    const direction = (el.dataset.parallaxDirection as ParallaxOptions['direction']) || 'vertical';
    const disabled = el.dataset.parallaxDisabled === 'true';
    
    new ParallaxSection(el, { speed, direction, disabled });
  });

  return elements;
}

export class MouseParallax {
  private container: HTMLElement;
  private layers: { element: HTMLElement; depth: number }[];
  private centerX: number = 0;
  private centerY: number = 0;
  private prefersReducedMotion: boolean;

  constructor(container: HTMLElement, layerSelector: string = '[data-parallax-layer]') {
    this.container = container;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.layers = Array.from(container.querySelectorAll(layerSelector)).map((el) => ({
      element: el as HTMLElement,
      depth: parseFloat((el as HTMLElement).dataset.parallaxLayer || '0.5')
    }));

    if (this.prefersReducedMotion) return;

    container.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    container.addEventListener('mouseleave', () => this.reset());
  }

  private onMouseMove(e: MouseEvent) {
    const rect = this.container.getBoundingClientRect();
    this.centerX = e.clientX - rect.left - rect.width / 2;
    this.centerY = e.clientY - rect.top - rect.height / 2;

    this.layers.forEach(({ element, depth }) => {
      const moveX = this.centerX * depth * 0.01;
      const moveY = this.centerY * depth * 0.01;
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }

  private reset() {
    this.layers.forEach(({ element }) => {
      element.style.transform = 'translate3d(0, 0, 0)';
    });
  }
}

export function initMouseParallax(containerSelector: string = '[data-mouse-parallax]') {
  const containers = document.querySelectorAll(containerSelector);
  
  containers.forEach((container) => {
    new MouseParallax(container as HTMLElement);
  });

  return containers;
}
