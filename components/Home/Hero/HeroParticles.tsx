'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 900;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#00e5ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WireframeCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#1fefc4" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

/**
 * Decorative-only R3F scene — no orbit controls, no interaction, kept lightweight.
 * Renders absolutely positioned behind hero content.
 */
export default function HeroParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <Particles />
      <WireframeCore />
    </Canvas>
  );
}