"use client";
import { useTheme } from "next-themes";
import { Switch } from "../switch";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center">
      <SunIcon className="h-4 w-4" />
      <Switch
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mx-2 hover:cursor-pointer"
      />
      <span className="sr-only">Toggle dark mode</span>
      <MoonIcon className="h-4 w-4 text-slate-500" />
    </div>
  );
}
