'use client';

import { useEffect, useState } from 'react';
import { shouldUse3D } from './webgl-support';

export function useShouldRender3D(minWidth?: number) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      const widthOk = minWidth ? window.innerWidth >= minWidth : true;
      setEnabled(shouldUse3D() && widthOk);
      setReady(true);
    };
    check();
    if (minWidth) {
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }
  }, [minWidth]);

  return { ready, enabled };
}
