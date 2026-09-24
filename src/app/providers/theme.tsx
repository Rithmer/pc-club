import {
  createContext,
  useContext,
  useMemo,
  useState,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
type Mode = "light" | "dark";
const ColorMode = createContext<{ mode: Mode; toggle: () => void }>({
  mode: "light",
  toggle: () => {},
});
export const useColorMode = () => useContext(ColorMode);
export function AppTheme({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() =>
    localStorage.getItem("ctrl-color-mode") === "dark" ? "dark" : "light",
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem("ctrl-color-mode", mode);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "light" ? "#ffffff" : "#0b0e14");
  }, [mode]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#0073e6" : "#66b2ff",
            contrastText: mode === "light" ? "#ffffff" : "#071426",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#0b0e14",
            paper: mode === "light" ? "#ffffff" : "#101720",
          },
          text: {
            primary: mode === "light" ? "#1a2638" : "#edf2f7",
            secondary: mode === "light" ? "#576779" : "#a4b2c3",
          },
          divider: mode === "light" ? "#e2e8f0" : "#263342",
        },
        typography: {
          fontFamily: '"Roboto Variable", Roboto, sans-serif',
          button: { textTransform: "none", fontWeight: 650 },
          h6: { fontWeight: 700 },
        },
        shape: { borderRadius: 14 },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: { root: { padding: "10px 18px", gap: 8 } },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: { background: mode === "light" ? "#ffffff" : "#0c121b" },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundImage: "none",
                border: `1px solid ${mode === "light" ? "#e2e8f0" : "#263342"}`,
              },
            },
          },
          MuiChip: { styleOverrides: { root: { borderRadius: 10 } } },
          MuiTooltip: { defaultProps: { arrow: true } },
        },
      }),
    [mode],
  );
  return (
    <ColorMode.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorMode.Provider>
  );
}
