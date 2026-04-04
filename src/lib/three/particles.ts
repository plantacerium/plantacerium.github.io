import * as THREE from 'three';

export interface ParticleConfig {
  count: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  spread: number;
}

export interface SceneConfig {
  particleCount: number;
  geometryComplexity: number;
  enablePostProcessing: boolean;
}

const defaultParticles: ParticleConfig = {
  count: 3000,
  size: 2,
  color: '#00f2ff',
  opacity: 0.8,
  speed: 0.5,
  spread: 50
};

export function createParticleSystem(
  scene: THREE.Scene,
  config: Partial<ParticleConfig> = {}
): THREE.Points {
  const cfg = { ...defaultParticles, ...config };
  
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(cfg.count * 3);
  const colors = new Float32Array(cfg.count * 3);
  const sizes = new Float32Array(cfg.count);
  const velocities = new Float32Array(cfg.count * 3);

  const color = new THREE.Color(cfg.color);
  const secondaryColor = new THREE.Color('#8b5cf6');
  const tertiaryColor = new THREE.Color('#d4a373');

  for (let i = 0; i < cfg.count; i++) {
    const i3 = i * 3;
    
    positions[i3] = (Math.random() - 0.5) * cfg.spread * 2;
    positions[i3 + 1] = (Math.random() - 0.5) * cfg.spread * 2;
    positions[i3 + 2] = (Math.random() - 0.5) * cfg.spread * 2;

    const colorChoice = Math.random();
    let particleColor: THREE.Color;
    if (colorChoice < 0.5) {
      particleColor = color;
    } else if (colorChoice < 0.8) {
      particleColor = secondaryColor;
    } else {
      particleColor = tertiaryColor;
    }

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;

    sizes[i] = Math.random() * cfg.size + cfg.size * 0.5;

    velocities[i3] = (Math.random() - 0.5) * cfg.speed * 0.1;
    velocities[i3 + 1] = (Math.random() - 0.5) * cfg.speed * 0.1;
    velocities[i3 + 2] = (Math.random() - 0.5) * cfg.speed * 0.1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;
      uniform float pixelRatio;
      
      void main() {
        vColor = color;
        
        vec3 pos = position;
        pos.x += sin(time * 0.5 + position.y * 0.1) * 0.5;
        pos.y += cos(time * 0.3 + position.x * 0.1) * 0.5;
        pos.z += sin(time * 0.4 + position.z * 0.1) * 0.5;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        vAlpha = 0.6 + 0.4 * sin(time + position.x);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
        vec3 glow = vColor * (1.0 + 0.5 * smoothstep(0.3, 0.0, dist));
        
        gl_FragColor = vec4(glow, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, material);
  particles.userData.velocities = velocities;
  particles.userData.config = cfg;
  
  scene.add(particles);
  return particles;
}

export function updateParticles(
  particles: THREE.Points,
  mouseX: number,
  mouseY: number,
  deltaTime: number
): void {
  const positions = particles.geometry.attributes.position.array as Float32Array;
  const velocities = particles.userData.velocities as Float32Array;
  const cfg = particles.userData.config as ParticleConfig;
  const material = particles.material as THREE.ShaderMaterial;

  material.uniforms.time.value += deltaTime * 0.5;

  const mouseInfluence = 0.02;
  const centerX = mouseX * 50;
  const centerY = mouseY * 50;

  for (let i = 0; i < cfg.count; i++) {
    const i3 = i * 3;
    
    const dx = positions[i3] - centerX;
    const dy = positions[i3 + 1] - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 20) {
      const force = (20 - dist) / 20 * mouseInfluence;
      velocities[i3] += dx * force;
      velocities[i3 + 1] += dy * force;
    }

    velocities[i3] *= 0.98;
    velocities[i3 + 1] *= 0.98;
    velocities[i3 + 2] *= 0.98;

    positions[i3] += velocities[i3];
    positions[i3 + 1] += velocities[i3 + 1];
    positions[i3 + 2] += velocities[i3 + 2];

    if (Math.abs(positions[i3]) > cfg.spread) velocities[i3] *= -0.5;
    if (Math.abs(positions[i3 + 1]) > cfg.spread) velocities[i3 + 1] *= -0.5;
    if (Math.abs(positions[i3 + 2]) > cfg.spread) velocities[i3 + 2] *= -0.5;
  }

  particles.geometry.attributes.position.needsUpdate = true;
}

export function createNebula(scene: THREE.Scene): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const count = 500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 80 + Math.random() * 40;

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
    positions[i3 + 2] = radius * Math.cos(phi);

    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i3] = 0; colors[i3 + 1] = 0.95; colors[i3 + 2] = 1;
    } else if (colorChoice < 0.66) {
      colors[i3] = 0.55; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.96;
    } else {
      colors[i3] = 0.83; colors[i3 + 1] = 0.64; colors[i3 + 2] = 0.45;
    }

    sizes[i] = Math.random() * 30 + 10;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vSize;
      uniform float time;
      
      void main() {
        vColor = color;
        vSize = size;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (500.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        float alpha = smoothstep(0.5, 0.0, dist) * 0.15;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const nebula = new THREE.Points(geometry, material);
  scene.add(nebula);
  return nebula;
}

export function updateNebula(nebula: THREE.Points, deltaTime: number): void {
  const material = nebula.material as THREE.ShaderMaterial;
  material.uniforms.time.value += deltaTime * 0.1;
  
  nebula.rotation.y += deltaTime * 0.02;
  nebula.rotation.x += deltaTime * 0.01;
}
