import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: boolean;
  setTheme: (theme: boolean) => void;
}
const LocalTheme = localStorage.getItem("theme-store");
export const themeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: LocalTheme ? JSON.parse(LocalTheme) : false,
      setTheme: (theme: boolean) => set({ theme }),
    }),
    { name: "theme-store" }
  )
);
