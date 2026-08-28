"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useTheme } from "@/app/theme-context";

// Lightweight 3D simplex noise (Ashima/stefan gustavson, public domain)
const noiseGLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = `
  uniform float uTime;
  uniform float uAmp;
  ${noiseGLSL}
  void main() {
    vec3 p = position;
    float n = snoise(p * 1.4 + uTime * 0.15);
    vec3 displaced = p + normal * n * uAmp;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = 1.6 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, 0.85);
  }
`;

function Blob({
  amp,
  beatSignal,
  color,
}: {
  amp: number;
  beatSignal: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.4, 20), []);
  const pulse = useRef({ extra: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // color only changes when the theme changes — not read every frame
  useEffect(() => {
    matRef.current?.uniforms.uColor.value.set(color);
  }, [color]);

  // one-shot amplitude "beat" whenever beatSignal increments
  useEffect(() => {
    if (!beatSignal) return;
    gsap.killTweensOf(pulse.current);
    gsap
      .timeline()
      .to(pulse.current, { extra: 0.55, duration: 0.16, ease: "power2.out" })
      .to(pulse.current, { extra: 0, duration: 0.55, ease: "power3.inOut" });
  }, [beatSignal]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    if (matRef.current) {
      const target = amp + pulse.current.extra;
      matRef.current.uniforms.uAmp.value = THREE.MathUtils.lerp(
        matRef.current.uniforms.uAmp.value,
        target,
        0.12
      );
    }
    if (ref.current) {
      ref.current.rotation.y += delta * (0.12 + pulse.current.extra * 0.3);
      ref.current.rotation.x = Math.sin(uniforms.uTime.value * 0.1) * 0.15;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function MeshBlob({
  amp = 0.5,
  active = true,
  beatSignal = 0,
  className = "",
}: {
  amp?: number;
  active?: boolean;
  beatSignal?: number;
  className?: string;
}) {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#f0f0f0" : "#1a1a1a";

  // don't mount a WebGL context at all for off-screen sections
  if (!active) {
    return (
      <div className={className} aria-hidden="true">
        <div
          className="w-full h-full rounded-full opacity-[0.14]"
          style={{ background: `radial-gradient(circle at 40% 35%, ${color}, transparent 70%)` }}
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 1.5]}>
        <Blob amp={amp} beatSignal={beatSignal} color={color} />
      </Canvas>
    </div>
  );
}
