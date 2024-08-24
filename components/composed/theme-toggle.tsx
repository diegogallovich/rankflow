"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "../switch";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      <Switch
        color="dark/zinc"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <MoonIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
    </div>
  );
}
