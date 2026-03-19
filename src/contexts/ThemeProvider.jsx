import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({children}) {
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

    const value = {
        isDark,
        handleToggle
    }

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}