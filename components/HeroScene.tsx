"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { heroProgress } from "@/lib/heroProgress";

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Soft studio reflections generated in code, so no HDR file is downloaded. */
function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    return () => { scene.environment = null; tex.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

/** Liquid chrome: a physical metal whose surface slowly ripples (vertex displacement injected into the standard shader). */
function useChrome(color: string, roughness: number, amp: number) {
  return useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.7 });
    const uTime = { value: 0 };
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = uTime;
      sh.vertexShader = "uniform float uTime;\n" + sh.vertexShader.replace(
        "#include <begin_vertex>",
        `vec3 transformed = vec3(position);
         float n = sin(position.x*2.6+uTime*0.9) + sin(position.y*3.1+uTime*1.2) + sin(position.z*2.2-uTime*0.7);
         transformed += normal * n * ${amp.toFixed(3)};`,
      );
    };
    return { mat, uTime };
  }, [color, roughness, amp]);
}

const TARGETS: [number, number, number][] = [[-2.6, 0.45, 0], [0, 0.45, 0.4], [2.6, 0.45, 0]];

function Universe() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const parts = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const coreM = useChrome("#9db6ff", 0.1, 0.03);
  const m1 = useChrome("#6a91ff", 0.14, 0.012);
  const m2 = useChrome("#98e4e0", 0.16, 0.01);
  const m3 = useChrome("#e6edff", 0.08, 0.01);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime, p = heroProgress.v, split = smooth(0.22, 0.62, p), k = Math.min(1, dt * 2.5);
    [coreM, m1, m2, m3].forEach((m) => (m.uTime.value = t));
    const g = group.current!;
    g.rotation.y += (heroProgress.x * 0.3 - g.rotation.y) * k;
    g.rotation.x += (-heroProgress.y * 0.18 - g.rotation.x) * k;
    state.camera.position.z = 6 + p * 0.9;
    const c = core.current!;
    c.rotation.y = t * 0.12 + p * 2.4; c.rotation.x = Math.sin(t * 0.2) * 0.2;
    c.scale.setScalar(Math.max(0.0001, 1.08 * (1 - split * 0.94)));
    parts.forEach((r, i) => {
      const m = r.current!, e = split;
      m.position.set(TARGETS[i][0] * e, TARGETS[i][1] * e, TARGETS[i][2] * e);
      m.scale.setScalar(Math.max(0.0001, e * 0.95));
      m.rotation.x = t * (0.18 + i * 0.07) + p * 2; m.rotation.y = t * (0.22 - i * 0.05);
    });
  });

  return (
    <group ref={group} position={[0, -0.1, 0]} scale={0.74}>
      <mesh ref={core} material={coreM.mat}><icosahedronGeometry args={[1.25, 30]} /></mesh>
      <mesh ref={parts[0]} material={m1.mat}><sphereGeometry args={[0.8, 64, 64]} /></mesh>
      <mesh ref={parts[1]} material={m2.mat}><boxGeometry args={[1.05, 1.05, 1.05]} /></mesh>
      <mesh ref={parts[2]} material={m3.mat}><torusKnotGeometry args={[0.52, 0.17, 160, 20]} /></mesh>
    </group>
  );
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 38 }} frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); requestAnimationFrame(onReady); }}>
      <Env />
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
      <pointLight position={[4, 2.5, 4]} intensity={70} color="#5578f4" />
      <pointLight position={[-4, -2, 3]} intensity={45} color="#98e4e0" />
      <pointLight position={[0, -3, -3]} intensity={30} color="#6a91ff" />
      <Universe />
    </Canvas>
  );
}
