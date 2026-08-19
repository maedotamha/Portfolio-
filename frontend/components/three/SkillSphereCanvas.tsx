'use client';

import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { SkillCategory } from '@/types';
import { getIcon } from '@/lib/icons';
import { useThemeColors } from './useThemeColors';

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

interface FlatSkill {
  name: string;
  icon: string;
  category: string;
  categoryIndex: number;
}

function colorToRgb(c: { r: number; g: number; b: number }) {
  return `${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}`;
}

function SkillPoints({ skills }: { skills: FlatSkill[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const colors = useThemeColors();
  const positions = useMemo(() => fibonacciSphere(skills.length, 3.4), [skills.length]);
  const palette = [colors.primary, colors.secondary, colors.primaryBright];

  return (
    <group>
      {skills.map((skill, i) => {
        const Icon = getIcon(skill.icon);
        const color = palette[skill.categoryIndex % palette.length];
        const rgb = colorToRgb(color);
        const isHovered = hovered === skill.name;
        const isDimmed = hovered !== null && !isHovered;

        return (
          <group key={skill.name} position={positions[i]}>
            <mesh>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={color} transparent opacity={isDimmed ? 0.25 : 0.9} />
            </mesh>
            <Html center distanceFactor={9} style={{ pointerEvents: 'auto' }}>
              <div
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(skill.name);
                }}
                onPointerOut={() => setHovered(null)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap select-none cursor-default"
                style={{
                  background: `rgba(${rgb}, ${isHovered ? 0.22 : 0.1})`,
                  border: `1px solid rgba(${rgb}, ${isHovered ? 0.65 : 0.25})`,
                  opacity: isDimmed ? 0.2 : 1,
                  transform: `scale(${isHovered ? 1.2 : 1})`,
                  transition: 'opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                }}
              >
                <span className="w-3 h-3 shrink-0" style={{ color: `rgb(${rgb})` }}>
                  <Icon className="w-3 h-3" />
                </span>
                <span className="text-[11px] font-mono text-foreground">{skill.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function WireSphere() {
  const colors = useThemeColors();
  return (
    <mesh>
      <icosahedronGeometry args={[3.4, 2]} />
      <meshBasicMaterial color={colors.primary} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

interface SkillSphereCanvasProps {
  skillCategories: SkillCategory[];
  active: boolean;
}

export default function SkillSphereCanvas({ skillCategories, active }: SkillSphereCanvasProps) {
  const skills: FlatSkill[] = useMemo(
    () =>
      skillCategories.flatMap((cat, ci) =>
        cat.skills.map((s) => ({ ...s, category: cat.category, categoryIndex: ci }))
      ),
    [skillCategories]
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
    >
      <WireSphere />
      <SkillPoints skills={skills} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
