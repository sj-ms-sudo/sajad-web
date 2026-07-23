'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitRings() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        position: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, -2 - Math.random() * 3] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        radius: 0.5 + Math.random() * 0.5,
        speed: 0.04 + Math.random() * 0.06,
      })),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += delta * rings[i].speed;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} position={r.position} rotation={r.rotation}>
          <torusGeometry args={[r.radius, 0.008, 8, 64]} />
          <meshBasicMaterial color="#19f0ff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function AchievementsBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none absolute inset-0"
    >
      <OrbitRings />
    </Canvas>
  );
}