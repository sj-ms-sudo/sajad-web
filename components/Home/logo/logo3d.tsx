'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WireframeShellProps {
  autoRotate?: boolean;
  rotateSpeed?: number;
}

function IcosaShell({ autoRotate = true, rotateSpeed = 0.15 }: WireframeShellProps) {
  const shellRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!autoRotate) return;
    if (shellRef.current) {
      shellRef.current.rotation.y += delta * rotateSpeed;
      shellRef.current.rotation.x += delta * rotateSpeed * 0.3;
    }
    if (ringARef.current) ringARef.current.rotation.z += delta * rotateSpeed * 0.6;
    if (ringBRef.current) ringBRef.current.rotation.z -= delta * rotateSpeed * 0.4;
  });

  return (
    <group>
      {/* outer wireframe cage — the "SJ" letters sit inside this via HTML overlay */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#19f0ff" wireframe transparent opacity={0.55} />
      </mesh>

      {/* thin orbit rings — nod to the orbit-logo concept, kept subtle */}
      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.7, 0.006, 8, 64]} />
        <meshBasicMaterial color="#19f0ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringBRef} rotation={[Math.PI / 3.2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.9, 0.005, 8, 64]} />
        <meshBasicMaterial color="#f5f5f5" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/**
 * Bare 3D wireframe shell, no letters — drop into any Canvas, or use LogoMark
 * for the full navbar-ready lockup with the SJ overlay baked in.
 */
export default function Logo3D({ autoRotate = true, rotateSpeed = 0.15 }: WireframeShellProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
    >
      <IcosaShell autoRotate={autoRotate} rotateSpeed={rotateSpeed} />
    </Canvas>
  );
}