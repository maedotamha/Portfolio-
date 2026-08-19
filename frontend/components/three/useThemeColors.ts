'use client';

import { useEffect, useState } from 'react';
import * as THREE from 'three';

function readColor(varName: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/).map(Number);
  const [r, g, b] = parts.length === 3 ? parts : [255, 255, 255];
  return new THREE.Color(r / 255, g / 255, b / 255);
}

function readAllColors() {
  return {
    background: readColor('--background'),
    primary: readColor('--primary'),
    primaryBright: readColor('--primary-bright'),
    secondary: readColor('--secondary'),
  };
}

export function useThemeColors() {
  const [colors, setColors] = useState(readAllColors);

  useEffect(() => {
    const update = () => setColors(readAllColors());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return colors;
}
