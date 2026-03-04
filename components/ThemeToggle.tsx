'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const nextDark = !html.classList.contains('dark');
    html.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    setIsDark(nextDark);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-border px-3 py-1 text-sm text-muted transition hover:border-accent hover:text-accent"
      aria-label="Toggle dark mode"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
