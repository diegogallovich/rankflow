'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/switch';
import { SunIcon, MoonIcon } from '@heroicons/react/16/solid';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span className="flex items-center">
        {isDark ? (
          <MoonIcon className="mr-3 h-5 w-5 text-zinc-400" />
        ) : (
          <SunIcon className="mr-3 h-5 w-5 text-zinc-500" />
        )}
        <span className="text-sm font-medium text-zinc-950 dark:text-white">
          {isDark ? 'Dark' : 'Light'} Mode
        </span>
      </span>
      <Switch checked={isDark} onChange={toggleTheme} color="dark/zinc" />
    </div>
  );
}
