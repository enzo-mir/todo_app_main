import { create } from "zustand";
import light from "../styles/lightTheme";
import dark from "../styles/darkTheme";

type theme = () => {
  bg: string;
  bg_image: string;
  card_bg: string;
  acitve_link: string;
  active_link_hover: string;
  text_clr: string;
  text_line_through: string;
  gradient_check: string;
  image_theme: string;
};
interface themeTypes {
  currentTheme: theme;
  setCurrentTheme(theme: theme): void;
}

export const themeStore = create<themeTypes>((set) => ({
  currentTheme: sessionStorage.getItem("theme")
    ? sessionStorage.getItem("theme") == "dark"
      ? dark
      : light
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? dark
    : light,
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
}));
