// services, features, and other libraries
import { useTheme } from "next-themes";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

// types
import type LangLoader from "@/lib/LangLoader";

interface ThemeChangerProps {
  ll: typeof LangLoader.prototype.themeChanger;
}

export default function ThemeChanger({ ll }: ThemeChangerProps) {
  // Determine whether the current theme is dark or light
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      title={isDarkMode ? ll["Light Mode"] : ll["Dark Mode"]}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      {isDarkMode ? <SunIcon className="size-11" /> : <MoonIcon className="size-11" />}
    </Button>
  );
}
