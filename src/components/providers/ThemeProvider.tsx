"use client";

import { createContext, ReactNode, useContext, useLayoutEffect, useState } from "react";

type ThemeContextType = {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useLayoutEffect(() => {
        const stored = localStorage.getItem('theme');
        const dark = stored
            ? stored === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;

            document.documentElement.classList.toggle('dark', dark);
            setIsDark(dark);
    }, []);

    const toggle = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', next); 
            return next;
        })
    }

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