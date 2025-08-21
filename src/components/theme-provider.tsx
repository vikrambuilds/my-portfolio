import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  useMemo
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystemTransition?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  resolvedTheme: Exclude<Theme, "system">;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isDark: false,
  resolvedTheme: "light",
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  enableSystemTransition = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    
    try {
      const storedTheme = localStorage.getItem(storageKey);
      return storedTheme && ["dark", "light", "system"].includes(storedTheme)
        ? (storedTheme as Theme)
        : defaultTheme;
    } catch (e) {
      console.warn("Failed to read theme from localStorage", e);
      return defaultTheme;
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<Exclude<Theme, "system">>(
    theme === "system" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light"
      : theme
  );

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    let actualTheme: Exclude<Theme, "system">;

    if (newTheme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      actualTheme = newTheme;
    }

    // Skip if theme hasn't changed
    if (root.classList.contains(actualTheme)) return;

    // Remove all theme classes
    root.classList.remove("light", "dark");
    // Add new theme class
    root.classList.add(actualTheme);
    setResolvedTheme(actualTheme);

    // Apply smooth transition if enabled
    if (enableSystemTransition && root.classList.length > 0) {
      const isThemeChange = root.classList.contains(
        actualTheme === "dark" ? "light" : "dark"
      );

      if (isThemeChange) {
        root.style.setProperty("--theme-transition-duration", "300ms");
        root.classList.add("theme-transition");
        const timeout = setTimeout(() => {
          root.classList.remove("theme-transition");
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [enableSystemTransition]);

  // Set initial theme and watch for system changes
  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
      applyTheme("system");
    };

    // Modern listener + fallback
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.warn("Failed to save theme to localStorage", e);
    }
    setThemeState(newTheme);
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    setTheme,
    isDark: resolvedTheme === "dark",
    resolvedTheme,
    toggleTheme,
  }), [theme, setTheme, resolvedTheme, toggleTheme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Add global types for theme classes
declare global {
  interface Document {
    classList: DOMTokenList;
  }
}