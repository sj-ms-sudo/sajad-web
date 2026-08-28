"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/app/theme-context";

function Particles({ color }: { color: string }) {
  const outerRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Points>(null);
  const outerGeo = useMemo(() => makeSphere(1800, 1.5, 0.12), []);
  const innerGeo = useMemo(() => makeSphere(1100, 0.85, 0.08), []);
  const outerMat = useRef<THREE.PointsMaterial>(null);
  const innerMat = useRef<THREE.PointsMaterial>(null);

  useEffect(() => {
    outerMat.current?.color.set(color);
    innerMat.current?.color.set(color);
  }, [color]);

  useFrame((state, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.05;
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.08;
  });

  return (
    <>
      <points ref={outerRef} geometry={outerGeo}>
        <pointsMaterial ref={outerMat} size={0.02} sizeAttenuation transparent opacity={0.5} color={color} />
      </points>
      <points ref={innerRef} geometry={innerGeo}>
        <pointsMaterial ref={innerMat} size={0.018} sizeAttenuation transparent opacity={0.8} color={color} />
      </points>
    </>
  );
}

function makeSphere(count: number, radius: number, jitter: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius + (Math.random() - 0.5) * jitter;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

export default function ParticleSphere({
  className = "",
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#f0f0f0" : "#1a1a1a";

  if (!active) {
    return (
      <div className={className} aria-hidden="true">
        <div
          className="w-full h-full rounded-full opacity-[0.12]"
          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 1.5]}>
        <Particles color={color} />
      </Canvas>
    </div>
  );
}
