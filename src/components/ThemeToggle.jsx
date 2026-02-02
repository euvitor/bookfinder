import { useState, useEffect } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      return;
    }
    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme:dark)",
    ).matches;

    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 transition"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5V3m0 18v-1.5m7.5-7.5H21M3 12h1.5M18.364 5.636 19.5 4.5M4.5 19.5l1.136-1.136M18.364 18.364 19.5 19.5M4.5 4.5l1.136 1.136M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 0 1 11.21 3 7.5 7.5 0 1 0 21 12.79Z"
          />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
