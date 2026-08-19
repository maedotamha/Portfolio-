'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const colors = useThemeColors();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uColorBg.value.copy(colors.background);
    materialRef.current.uniforms.uColorA.value.copy(colors.primary);
    materialRef.current.uniforms.uColorB.value.copy(colors.secondary);
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
          uColorBg: { value: colors.background.clone() },
          uColorA: { value: colors.primary.clone() },
          uColorB: { value: colors.secondary.clone() },
        }}
      />
    </mesh>
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
    </Canvas>
  );
}
