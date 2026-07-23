'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EmberShards() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3,
          -2 - Math.random() * 3,
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.9,
        speed: 0.05 + Math.random() * 0.08,
      })),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * shards[i].speed;
      child.rotation.y += delta * shards[i].speed * 0.7;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#19f0ff"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Decorative-only backdrop for page headers — same language as HeroParticles
 * but sparser and tinted toward the page's accent color (ember red here).
 */
export default function WorksBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none absolute inset-0"
    >
      <EmberShards />
    </Canvas>
  );
}