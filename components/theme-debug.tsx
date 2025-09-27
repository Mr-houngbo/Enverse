import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function ThemeDebug() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-sm">
      <div>Theme: {theme}</div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="mt-2 px-3 py-1 bg-orange-500 rounded text-xs"
      >
        Toggle Theme
      </button>
    </div>
  );
}
