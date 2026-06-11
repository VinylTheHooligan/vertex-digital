"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const dark = stored
            ? stored === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;

            setIsDark(dark);
            setMounted(true);
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggle = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        })
    }

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.toggle('dark', isDark);
        }
    }, [isDark, mounted]);

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextType  {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme doit être utilisé avec un ThemeProvider");
    return context;
}