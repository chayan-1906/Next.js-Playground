"use client";

import React, {createContext, useState} from "react";

type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: (theme: 'light' | 'dark') => {
    },
});

export const ThemeProvider = ({children}: { children: React.ReactNode; }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <ThemeContext value={{theme, setTheme}}>
            {children}
        </ThemeContext>
    );
}

// export const useThemeContext = () => useContext(ThemeContext);
export {ThemeContext};
