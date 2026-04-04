import * as THREE from 'three';

export interface FloatingGeometry {
  mesh: THREE.Mesh;
  initialPosition: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  floatSpeed: number;
  floatAmplitude: number;
  floatOffset: number;
}

export function createFloatingGeometries(
  scene: THREE.Scene,
  complexity: number = 1
): FloatingGeometry[] {
  const geometries: FloatingGeometry[] = [];
  const count = Math.floor(8 * complexity);

  const materials = [
    new THREE.MeshPhysicalMaterial({
      color: 0x00f2ff,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0xd4a373,
      metalness: 0.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      envMapIntensity: 1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    })
  ];

  const shapeGeometries = [
    () => new THREE.IcosahedronGeometry(1, 1),
    () => new THREE.OctahedronGeometry(1, 0),
    () => new THREE.TetrahedronGeometry(1, 0),
    () => new THREE.DodecahedronGeometry(0.8, 0),
    () => new THREE.TorusGeometry(0.6, 0.2, 8, 16),
    () => new THREE.TorusKnotGeometry(0.4, 0.15, 64 * complexity, 8),
  ];

  for (let i = 0; i < count; i++) {
    const geometryFactory = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
    let geometry = geometryFactory();
    
    const scale = (0.3 + Math.random() * 0.7) * complexity;
    geometry.scale(scale, scale, scale);

    const material = materials[Math.floor(Math.random() * materials.length)].clone();
    
    const mesh = new THREE.Mesh(geometry, material);
    
    const initialPosition = new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30 - 10
    );
    mesh.position.copy(initialPosition);
    
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    const geometryData: FloatingGeometry = {
      mesh,
      initialPosition: initialPosition.clone(),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.3
      ),
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmplitude: 0.5 + Math.random() * 1,
      floatOffset: Math.random() * Math.PI * 2
    };

    geometries.push(geometryData);
    scene.add(mesh);
  }

  return geometries;
}

export function updateFloatingGeometries(
  geometries: FloatingGeometry[],
  time: number,
  mouseX: number,
  mouseY: number
): void {
  for (const geo of geometries) {
    geo.mesh.rotation.x += geo.rotationSpeed.x * 0.01;
    geo.mesh.rotation.y += geo.rotationSpeed.y * 0.01;
    geo.mesh.rotation.z += geo.rotationSpeed.z * 0.01;

    const floatY = Math.sin(time * geo.floatSpeed + geo.floatOffset) * geo.floatAmplitude;
    const floatX = Math.cos(time * geo.floatSpeed * 0.5 + geo.floatOffset) * geo.floatAmplitude * 0.5;
    
    geo.mesh.position.x = geo.initialPosition.x + floatX + mouseX * 2;
    geo.mesh.position.y = geo.initialPosition.y + floatY + mouseY * 2;

    const material = geo.mesh.material as THREE.MeshPhysicalMaterial;
    if (material.opacity !== undefined) {
      material.opacity = 0.4 + Math.sin(time * 0.5 + geo.floatOffset) * 0.2;
    }
  }
}

export function createHolographicGrid(scene: THREE.Scene): THREE.GridHelper {
  const size = 100;
  const divisions = 50;
  
  const grid = new THREE.GridHelper(size, divisions, 0x00f2ff, 0x1a1a2e);
  
  const material = (grid.material as THREE.Material).clone();
  if (Array.isArray(material)) {
    material[0].transparent = true;
    material[0].opacity = 0.3;
    material[1].transparent = true;
    material[1].opacity = 0.1;
  } else {
    material.transparent = true;
    material.opacity = 0.15;
  }
  
  grid.position.y = -15;
  grid.rotation.x = Math.PI * 0.02;
  
  scene.add(grid);
  return grid;
}

export function updateGrid(grid: THREE.GridHelper, time: number): void {
  grid.position.z = (time * 0.5) % 2;
}

export function createEnergyRings(scene: THREE.Scene): THREE.Mesh[] {
  const rings: THREE.Mesh[] = [];
  
  const ringData = [
    { radius: 8, tube: 0.02, color: 0x00f2ff, speed: 0.3, tilt: 0.5 },
    { radius: 10, tube: 0.015, color: 0x8b5cf6, speed: -0.2, tilt: 0.8 },
    { radius: 12, tube: 0.01, color: 0xd4a373, speed: 0.15, tilt: 1.2 }
  ];
  
  for (const data of ringData) {
    const geometry = new THREE.TorusGeometry(data.radius, data.tube, 8, 100);
    const material = new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.4
    });
    
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2 + data.tilt;
    ring.rotation.z = data.tilt;
    
    ring.userData.speed = data.speed;
    ring.userData.baseTilt = data.tilt;
    
    rings.push(ring);
    scene.add(ring);
  }
  
  return rings;
}

export function updateEnergyRings(rings: THREE.Mesh[], time: number, mouseX: number, mouseY: number): void {
  for (const ring of rings) {
    ring.rotation.z = ring.userData.baseTilt + time * ring.userData.speed;
    ring.position.x = mouseX * 3;
    ring.position.y = mouseY * 3;
    
    const material = ring.material as THREE.MeshBasicMaterial;
    material.opacity = 0.3 + Math.sin(time * 2) * 0.15;
  }
}
