'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeColors } from './useThemeColors';

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  const colors = useThemeColors();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x += delta * 0.12;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.62, 1]} />
      <meshBasicMaterial color={colors.primary} wireframe transparent opacity={0.85} />
    </mesh>
  );
}

function GearRing({
  radius,
  tilt,
  speed,
  color,
  nodeCount,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: THREE.Color;
  nodeCount: number;
}) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * speed;
  });

  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2;
        return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number];
      }),
    [radius, nodeCount]
  );

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <group ref={ringRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Rig() {
  const colors = useThemeColors();
  return (
    <>
      <Core />
      <GearRing radius={0.95} tilt={[Math.PI / 2.3, 0, 0]} speed={0.5} color={colors.secondary} nodeCount={3} />
      <GearRing radius={1.2} tilt={[Math.PI / 3.5, Math.PI / 4, 0]} speed={-0.32} color={colors.primary} nodeCount={4} />
    </>
  );
}

export default function MachineOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Rig />
    </Canvas>
  );
}
