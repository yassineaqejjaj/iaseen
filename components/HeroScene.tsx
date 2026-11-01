"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { heroProgress } from "@/lib/heroProgress";

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/**
 * Visual language: dark glass with a luminous rim (blue to cyan), fine lines and points. No mirror chrome, no flat shading,
 * no environment map, so nothing in the scene reflects a recognisable room. Everything is drawn by one small shader.
 */
const VERT = /* glsl */ `
  uniform float uTime; uniform float uWob;
  varying vec3 vN; varying vec3 vV;
  void main() {
    vec3 p = position + normal * (sin(position.y * 3.0 + uTime * 0.8) + sin(position.x * 2.3 - uTime * 0.6)) * 0.5 * uWob;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;
const FRAG = /* glsl */ `
  uniform vec3 uA; uniform vec3 uB; uniform float uPower; uniform float uGain; uniform float uBase; uniform float uOpacity;
  varying vec3 vN; varying vec3 vV;
  void main() {
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), uPower);
    vec3 col = mix(uA, uB, smoothstep(0.15, 1.0, f));
    gl_FragColor = vec4(col * (0.55 + f * 1.1), (uBase + f * uGain) * uOpacity);
  }`;

function useGlass(a: string, b: string, o: { power?: number; gain?: number; base?: number; wob?: number } = {}) {
  return useMemo(() => {
    const u = {
      uTime: { value: 0 }, uWob: { value: o.wob ?? 0 }, uOpacity: { value: 1 },
      uA: { value: new THREE.Color(a) }, uB: { value: new THREE.Color(b) },
      uPower: { value: o.power ?? 2.6 }, uGain: { value: o.gain ?? 0.95 }, uBase: { value: o.base ?? 0.04 },
    };
    const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    return { mat, u };
  }, [a, b, o.power, o.gain, o.base, o.wob]);
}

/** Points spread evenly over a sphere, used as a fine "neural" shell. */
function useShell(n: number) {
  return useMemo(() => {
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      arr.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [n]);
}

const dark = { color: "#050814", transparent: true, opacity: 0.9, toneMapped: false } as const;
const TARGETS: [number, number, number][] = [[-2.6, 0.45, 0], [0, 0.45, 0.4], [2.6, 0.45, 0]];

function Universe() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Points>(null);
  const parts = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const coreG = useGlass("#4f74ee", "#98e4e0", { power: 2.4, gain: 1.05, base: 0.05, wob: 0.012 });
  const orbG = useGlass("#5578f4", "#98e4e0", { power: 2.4, gain: 1.0 });
  const cubeG = useGlass("#4f74ee", "#98e4e0", { power: 3.2, gain: 0.7, base: 0.03 });
  const knotG = useGlass("#98e4e0", "#6a91ff", { power: 1.8, gain: 0.85, base: 0.1 });
  const dots = useShell(1100);
  const cubeEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06, 1.06, 1.06)), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime, p = heroProgress.v, split = smooth(0.22, 0.62, p), k = Math.min(1, dt * 2.5);
    [coreG, orbG, cubeG, knotG].forEach((m) => (m.u.uTime.value = t));
    const g = group.current!;
    // The sphere sits just under the top text block and is sized from the canvas height, so it never covers the brand lines.
    const h = state.size.height, cam = state.camera as THREE.PerspectiveCamera;
    const halfH = Math.tan((cam.fov * Math.PI) / 360) * 6;
    const room = Math.max(0, heroProgress.bottomEdge - heroProgress.topEdge);
    const fit = Math.min(130, room / 2 - 10);
    const squeezed = fit < 48;
    const rBand = squeezed ? 48 : fit, cBand = heroProgress.topEdge + room / 2;
    const rPx = rBand + (190 - rBand) * split, cPx = cBand + (h * 0.4 - cBand) * split;
    g.scale.setScalar((rPx / (h / 2)) * halfH / 1.25);
    g.position.y = -((cPx - h / 2) / (h / 2)) * halfH;
    coreG.u.uOpacity.value = squeezed ? 0.35 + 0.65 * split : 1;
    g.rotation.y += (heroProgress.x * 0.3 - g.rotation.y) * k;
    g.rotation.x += (-heroProgress.y * 0.18 - g.rotation.x) * k;
    state.camera.position.z = 6 + p * 0.9;
    const c = core.current!;
    c.rotation.y = t * 0.1 + p * 2.4; c.rotation.x = Math.sin(t * 0.2) * 0.15;
    c.scale.setScalar(Math.max(0.0001, 1 - split));
    c.visible = split < 0.9; // fully gone once split, so nothing shows through the cube
    if (shell.current) shell.current.rotation.y = -t * 0.06;
    parts.forEach((r, i) => {
      const m = r.current!, e = split;
      // Fly-in: the chosen object swells toward the camera and the others fall away.
      const d = heroProgress.dive, mine = heroProgress.focus === i;
      const f = mine ? d : 0;
      m.position.set(TARGETS[i][0] * e * (1 - f), (TARGETS[i][1] * e) * (1 - f) + f * 0.2, TARGETS[i][2] * e + f * 2.4);
      m.scale.setScalar(Math.max(0.0001, e * 0.95 * (mine ? 1 + d * 1.6 : 1 - d)));
      m.rotation.x = t * (0.12 + i * 0.05) + p * 2; m.rotation.y = t * (0.16 - i * 0.04);
    });
  });

  return (
    <group ref={group}>
      {/* LEAD / the whole: a glass orb with a fine shell of points */}
      <group ref={core}>
        <mesh><sphereGeometry args={[1.2, 64, 64]} /><meshBasicMaterial {...dark} /></mesh>
        <mesh material={coreG.mat}><sphereGeometry args={[1.25, 96, 96]} /></mesh>
        <points ref={shell} geometry={dots} scale={1.27}>
          <pointsMaterial color="#98e4e0" size={0.016} sizeAttenuation transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </points>
      </group>

      {/* LEAD: orb with a thin orbit */}
      <group ref={parts[0]}>
        <mesh><sphereGeometry args={[0.76, 48, 48]} /><meshBasicMaterial {...dark} /></mesh>
        <mesh material={orbG.mat}><sphereGeometry args={[0.8, 64, 64]} /></mesh>
        <mesh rotation={[1.25, 0, 0.35]}><torusGeometry args={[1.08, 0.005, 8, 200]} /><meshBasicMaterial color="#9bb4ff" transparent opacity={0.65} toneMapped={false} /></mesh>
      </group>

      {/* BUILD: glass cube with a luminous edge */}
      <group ref={parts[1]}>
        <mesh><boxGeometry args={[1.0, 1.0, 1.0]} /><meshBasicMaterial {...dark} /></mesh>
        <mesh material={cubeG.mat}><boxGeometry args={[1.06, 1.06, 1.06]} /></mesh>
        <lineSegments geometry={cubeEdges}><lineBasicMaterial color="#cfeef0" transparent opacity={0.6} toneMapped={false} /></lineSegments>
      </group>

      {/* THINK: a slim glass ribbon knot */}
      <group ref={parts[2]}>
        <mesh material={knotG.mat}><torusKnotGeometry args={[0.55, 0.075, 280, 28]} /></mesh>
      </group>
    </group>
  );
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 38 }} frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); requestAnimationFrame(onReady); }}>
      <Universe />
    </Canvas>
  );
}
