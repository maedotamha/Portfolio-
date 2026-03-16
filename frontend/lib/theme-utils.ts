import { Theme } from '@/types';

export function getInitialTheme(): Theme {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Try to get theme from localStorage
  try {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
  }

  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function saveThemePreference(theme: Theme): void {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
