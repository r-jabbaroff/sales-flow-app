import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CiLight, CiDark } from "react-icons/ci";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Button
        className="rounded-full bg-[var(--muted)]"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <CiLight className="dark:-rotate-50 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-[var(--foreground)] transition-all dark:-rotate-90 dark:scale-0" />
        <CiDark className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-[var(--foreground)] transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
};

export default ThemeToggler;
