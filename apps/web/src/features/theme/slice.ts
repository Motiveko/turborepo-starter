import type { SliceCreator } from "@web/stores/root-store";

export type Theme = "light" | "dark";
export interface ThemeSlice {
  state: Theme;
  set: (theme: Theme) => void;
  toggle: () => void;
}

const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

document.documentElement.classList.toggle("dark", initialTheme === "dark");

const toggleTheme = (theme: Theme) => (theme === "light" ? "dark" : "light");

export const createThemeSlice: SliceCreator<ThemeSlice> = (set) => ({
  state: initialTheme,
  set: (theme) => {
    set((state) => {
      state.theme.state = theme;
    });
  },
  toggle: () => {
    set((state) => {
      state.theme.state = toggleTheme(state.theme.state);
    });
  },
});
