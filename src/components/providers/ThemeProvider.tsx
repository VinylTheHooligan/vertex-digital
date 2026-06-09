"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem('theme');
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-schema: dark)").matches;
    });

    const toggle = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

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