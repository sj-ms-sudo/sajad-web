'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DocumentPlanes() {
  const groupRef = useRef<THREE.Group>(null);

  const docs = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3,
          -2 - Math.random() * 2,
        ] as [number, number, number],
        rotation: [Math.random() * 0.4, Math.random() * 0.6, Math.random() * 0.2] as [
          number,
          number,
          number,
        ],
        speed: 0.03 + Math.random() * 0.05,
      })),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.y += delta * docs[i].speed;
      child.position.y += Math.sin(Date.now() * 0.0003 + i) * 0.0009;
    });
  });

  return (
    <group ref={groupRef}>
      {docs.map((d, i) => (
        <mesh key={i} position={d.position} rotation={d.rotation}>
          <planeGeometry args={[0.9, 1.2]} />
          <meshBasicMaterial color="#19f0ff" wireframe transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function CertificatesBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none absolute inset-0"
    >
      <DocumentPlanes />
    </Canvas>
  );
}