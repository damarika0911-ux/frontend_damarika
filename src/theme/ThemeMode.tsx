import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export type Mode = "light" | "dark";
const STORAGE_KEY = "damarika-theme";

const ModeContext = createContext<{ mode: Mode; toggle: () => void }>({ mode: "light", toggle: () => {} });

/** Saved choice wins; otherwise follow the operating system. Matches the inline script in index.html. */
function initialMode(): Mode {
  const attr = document.documentElement.dataset.theme;
  if (attr === "dark" || attr === "light") return attr;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* storage blocked: fall through */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", mode === "dark" ? "#120c08" : "#6d3a1f");
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* not persisted; still switches for this visit */
      }
      return next;
    });
  }, []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "dark" ? "#e3b48a" : "#6d3a1f" },
          error: { main: mode === "dark" ? "#f87171" : "#dc2626" },
          background: mode === "dark" ? { default: "#120c08", paper: "#21170f" } : { default: "#ffffff", paper: "#ffffff" },
          text: mode === "dark" ? { primary: "#f5ede4", secondary: "#b8ada1" } : { primary: "#1a0e05", secondary: "#6b6b73" },
        },
        typography: { fontFamily: "'Poppins', sans-serif" },
      }),
    [mode],
  );

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);
  return (
    <ModeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ModeContext);
