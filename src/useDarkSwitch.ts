import { useState, useEffect, useCallback } from 'react';

interface UseDarkSwitchOptions {
  defaultMode?: boolean;
  storageKey?: string;
  onChange?: (isDark: boolean) => void;
  syncWithSystem?: boolean;
  transitionDuration?: number;
  classNameDark?: string;
  classNameLight?: string;
  storageProvider?: Storage | null;
}

interface UseDarkSwitchReturn {
  isDark: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
  setMode: (isDark: boolean) => void;
  systemTheme: 'dark' | 'light' | null;
  isTransitioning: boolean;
}

export function useDarkSwitch({
  defaultMode = false,
  storageKey = 'dark-mode',
  onChange,
  syncWithSystem = false,
  transitionDuration = 300,
  classNameDark = 'dark',
  classNameLight = 'light',
  storageProvider = typeof window !== 'undefined' ? window.localStorage : null,
}: UseDarkSwitchOptions = {}): UseDarkSwitchReturn {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return defaultMode;
    if (syncWithSystem) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    const storedValue = storageProvider?.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : defaultMode;
  });

  const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggle = useCallback(() => setIsDark((prev: boolean) => !prev), []);
  const enable = useCallback(() => setIsDark(true), []);
  const disable = useCallback(() => setIsDark(false), []);
  const setMode = useCallback((value: boolean) => setIsDark(value), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
      if (syncWithSystem) {
        setIsDark(e.matches);
      }
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [syncWithSystem]);

  useEffect(() => {
    if (onChange) {
      onChange(isDark);
    }

    if (storageProvider) {
      storageProvider.setItem(storageKey, JSON.stringify(isDark));
    }

    const element = window.document.body; // Change from document.documentElement to document.body
    if (isDark) {
      element.classList.remove(classNameLight);
      element.classList.add(classNameDark);
    } else {
      element.classList.remove(classNameDark);
      element.classList.add(classNameLight);
    }

    if (transitionDuration > 0) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [
    isDark,
    onChange,
    storageProvider,
    storageKey,
    classNameDark,
    classNameLight,
    transitionDuration,
  ]);

  return {
    isDark,
    toggle,
    enable,
    disable,
    setMode,
    systemTheme,
    isTransitioning,
  };
}
