"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useTheme } from "@/app/theme-context";

/** tracks the cursor across the whole page, not just inside this canvas */
function useGlobalPointer() {
  const pointer = useRef({ x: 0, y: 0, clientX: -9999, clientY: -9999 });
  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.clientX = e.clientX;
      pointer.current.clientY = e.clientY;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Eye({
  x,
  pointer,
  wow,
  fear,
}: {
  x: number;
  pointer: MutableRefObject<{ x: number; y: number }>;
  wow: MutableRefObject<number>;
  fear: MutableRefObject<number>;
}) {
  const pupilRef = useRef<THREE.Mesh>(null);
  const scleraRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (pupilRef.current) {
      const calmX = THREE.MathUtils.clamp(pointer.current.x * 0.06, -0.055, 0.055);
      const calmY = THREE.MathUtils.clamp(pointer.current.y * 0.06, -0.055, 0.055);
      // calm: pupil eases toward cursor. scared: pupil pulls away from it.
      const targetX = THREE.MathUtils.lerp(calmX, -calmX * 0.6, fear.current);
      const targetY = THREE.MathUtils.lerp(calmY, -calmY * 0.6, fear.current);
      pupilRef.current.position.x = THREE.MathUtils.lerp(pupilRef.current.position.x, targetX, 0.15);
      pupilRef.current.position.y = THREE.MathUtils.lerp(pupilRef.current.position.y, targetY, 0.15);
      const settle = 1 - wow.current;
      const pupilTarget = 1 - wow.current * 0.25 - fear.current * 0.3 * settle;
      pupilRef.current.scale.setScalar(THREE.MathUtils.lerp(pupilRef.current.scale.x, pupilTarget, 0.2));
    }
    if (scleraRef.current) {
      const settle = 1 - wow.current;
      const scleraTarget = 1 + wow.current * 0.55 + fear.current * 0.35 * settle;
      scleraRef.current.scale.setScalar(THREE.MathUtils.lerp(scleraRef.current.scale.x, scleraTarget, 0.2));
    }
  });

  return (
    <group position={[x, 0.12, 0.455]}>
      <group ref={scleraRef}>
        <mesh>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh ref={pupilRef} position={[0, 0, 0.07]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#151515" />
        </mesh>
      </group>
    </group>
  );
}

function Mouth({
  wow,
  fear,
  color,
}: {
  wow: MutableRefObject<number>;
  fear: MutableRefObject<number>;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const settle = 1 - wow.current;
    const target = 0.22 + wow.current * 0.8 - fear.current * 0.14 * settle;
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, Math.max(target, 0.06), 0.2);
  });
  return (
    <mesh ref={ref} position={[0, -0.19, 0.455]}>
      <torusGeometry args={[0.09, 0.025, 12, 24]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function Character({
  beatSignal,
  bodyColor,
  standColor,
  mouthColor,
  containerRef,
}: {
  beatSignal: number;
  bodyColor: string;
  standColor: string;
  mouthColor: string;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const pointer = useGlobalPointer();
  const wow = useRef(0);
  const fear = useRef(0);
  const clock = useRef(0);

  // "wow" pop the instant this section is the one being left — fires
  // before the exit/enter phases run, so the expression reads first
  useEffect(() => {
    if (!beatSignal) return;
    gsap.killTweensOf(wow);
    gsap
      .timeline()
      .to(wow, { current: 1, duration: 0.16, ease: "power2.out" })
      .to(wow, { current: 0, duration: 0.6, ease: "power3.inOut" }, "+=0.15");
  }, [beatSignal]);

    useFrame((state, delta) => {
    clock.current += delta;

    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(pointer.current.clientX - cx, pointer.current.clientY - cy);
      const NEAR = 140;
      const FAR = 520;
      const target = 1 - THREE.MathUtils.clamp((dist - NEAR) / (FAR - NEAR), 0, 1);
      fear.current = THREE.MathUtils.lerp(fear.current, target, 0.08);
    }

    if (groupRef.current) {
      groupRef.current.position.y = -0.1 + Math.sin(clock.current * 1.2) * 0.05;
      groupRef.current.rotation.y = Math.sin(clock.current * 0.5) * 0.08;
      const leanTarget = -0.08 * fear.current; // leans away from cursor, settles forward when relieved
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, leanTarget, 0.08);
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(clock.current * 2) * 0.05 - fear.current * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* case top face is at y = 1.15/2 = 0.575 — antenna base starts
          right there (slightly overlapped) so it reads as attached,
          not floating */}
      <group ref={antennaRef} position={[0, 0.565, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.3, 8]} />
          <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#e0505a" roughness={0.35} metalness={0.15} />
        </mesh>
      </group>

      <RoundedBox args={[1.5, 1.15, 0.9]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color={bodyColor} roughness={0.55} metalness={0.08} />
      </RoundedBox>

      {/* case front face is at z = 0.9/2 = 0.45 — screen sits recessed
          just behind it, instead of poking out past the case */}
      <RoundedBox args={[1.15, 0.85, 0.05]} radius={0.06} smoothness={4} position={[0, 0, 0.41]}>
        <meshStandardMaterial color="#0d0d10" roughness={0.25} metalness={0.2} />
      </RoundedBox>

      <Eye x={-0.24} pointer={pointer} wow={wow} fear={fear} />
      <Eye x={0.24} pointer={pointer} wow={wow} fear={fear} />
      <Mouth wow={wow} fear={fear} color={mouthColor} />

      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.18, 16]} />
        <meshStandardMaterial color={standColor} roughness={0.6} metalness={0.08} />
      </mesh>
    </group>
  );
}

export default function CRTMonitor({
  active = true,
  beatSignal = 0,
  className = "",
}: {
  amp?: number; // unused, kept so existing call sites don't need to change
  active?: boolean;
  beatSignal?: number;
  className?: string;
}) {
  const { theme } = useTheme();
  // body/stand are a distinctly different shade from the screen bezel
  // (which stays near-black in both themes, like real CRT glass) so the
  // shell reads as a separate shape instead of merging into one silhouette.
  // dark-mode shades are pulled up further from the page background
  // (--bg: #121212) so the character doesn't sink into it.
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyColor = theme === "dark" ? "#55555c" : "#e6e5e0";
  const standColor = theme === "dark" ? "#403f45" : "#cac9c3";
  const mouthColor = "#5a5a5f"; // constant across themes — bezel is near-black in both
  const accent = theme === "dark" ? "#3fd6b4" : "#2fbf9f";

  // don't mount a WebGL context at all for off-screen sections
  if (!active) {
    return (
      <div className={className} aria-hidden="true">
        <div
          className="w-full h-full rounded-full opacity-[0.14]"
          style={{ background: `radial-gradient(circle at 40% 35%, ${bodyColor}, transparent 70%)` }}
        />
      </div>
    );
  }

    return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0.02, 3.7], fov: 35 }} dpr={[1, 1.5]}>
        <ambientLight intensity={theme === "dark" ? 0.6 : 0.45} />
        <directionalLight position={[2.5, 3, 3]} intensity={theme === "dark" ? 1.3 : 1.1} />
        <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#8ab4ff" />
        <pointLight position={[0, -0.3, -2.2]} intensity={theme === "dark" ? 0.9 : 0.3} color={accent} />
        <Character
          beatSignal={beatSignal}
          bodyColor={bodyColor}
          standColor={standColor}
          mouthColor={mouthColor}
          containerRef={containerRef}
        />
      </Canvas>
    </div>
  );
}