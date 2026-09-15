'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeColors } from './useThemeColors';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorBg;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;

    float n1 = sin(uv.x * 3.0 + t) * cos(uv.y * 3.0 - t * 0.8);
    float n2 = sin((uv.x + uv.y) * 4.0 - t * 1.3);
    float blend1 = smoothstep(-0.2, 1.0, n1 * 0.5 + n2 * 0.5);

    float n3 = sin((uv.x - uv.y) * 3.5 + t * 1.1);
    float blend2 = smoothstep(0.1, 0.9, uv.y + n3 * 0.15);

    vec3 color = uColorBg;
    color = mix(color, uColorA, blend1 * 0.22);
    color = mix(color, uColorB, blend2 * 0.14);

    // Mouse-reveal glow: a soft lens of primary/secondary light following the cursor
    float distToMouse = distance(uv, uMouse);
    float glow = smoothstep(0.45, 0.0, distToMouse);
    color = mix(color, uColorA, glow * 0.16);
    color += uColorB * glow * glow * 0.08;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const colors = useThemeColors();
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uColorBg.value.copy(colors.background);
    materialRef.current.uniforms.uColorA.value.copy(colors.primary);
    materialRef.current.uniforms.uColorB.value.copy(colors.secondary);

    mouseTarget.current.set((state.pointer.x + 1) / 2, (state.pointer.y + 1) / 2);
    const uMouse = materialRef.current.uniforms.uMouse.value as THREE.Vector2;
    uMouse.lerp(mouseTarget.current, 0.06);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uColorBg: { value: colors.background.clone() },
          uColorA: { value: colors.primary.clone() },
          uColorB: { value: colors.secondary.clone() },
        }}
      />
    </mesh>
  );
}

function DataField() {
  const groupRef = useRef<THREE.Group>(null);
  const colors = useThemeColors();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle parallax drift toward the cursor for depth
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.4,
      0.03
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.3,
      0.03
    );
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <Sparkles
        count={70}
        scale={[viewport.width * 1.1, viewport.height * 1.1, 3]}
        size={2.2}
        speed={0.25}
        opacity={0.55}
        color={colors.primary}
      />
      <Sparkles
        count={35}
        scale={[viewport.width * 1.1, viewport.height * 1.1, 2]}
        size={3}
        speed={0.18}
        opacity={0.4}
        color={colors.secondary}
      />
    </group>
  );
}

interface GradientCanvasProps {
  active: boolean;
}

export default function GradientCanvas({ active }: GradientCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: false, alpha: false }}
      className="!absolute !inset-0"
    >
      <GradientPlane />
      <DataField />
    </Canvas>
  );
}
