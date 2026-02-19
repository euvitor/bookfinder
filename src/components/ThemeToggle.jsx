import { useState, useEffect } from "react";

/**
 * ThemeToggle - Botão para alternar entre modo claro e escuro
 *
 * Prioridades de tema:
 * 1. Preferência salva no localStorage
 * 2. Preferência do sistema (prefers-color-scheme)
 * 3. Padrão: modo claro
 *
 * Persiste a escolha do usuário no localStorage.
 */
function ThemeToggle() {
  // Lazy initialization: calcula estado inicial apenas uma vez
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");

    // Prioridade 1: Tema salvo explicitamente
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;

    // Prioridade 2: Preferência do sistema operacional
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark;
  });

  // Sincroniza estado com classe "dark" no HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  /**
   * handleToggle - Alterna tema e salva no localStorage
   */
  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
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
      {/* Ícone de Sol (modo escuro ativo) */}
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
        /* Ícone de Lua (modo claro ativo) */
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
