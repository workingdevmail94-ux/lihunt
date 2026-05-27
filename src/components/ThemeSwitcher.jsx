import { Sun, Moon } from "lucide-react";
export default function ThemeSwitcher(props) {
    return (
        <div className="theme-switcher" aria-label="Theme switcher">
  <button
    type="button"
    className={
      "theme-switcher__btn" +
      (props.theme === "light" ? " theme-switcher__btn--active" : "")
    }
    onClick={() => props.setTheme("light")}
    aria-label="Switch to light theme"
    aria-pressed={props.theme === "light"}
  >
    <Sun className="theme-switcher__icon" />
  </button>

  <button
    type="button"
    className={
      "theme-switcher__btn" +
      (props.theme === "dark" ? " theme-switcher__btn--active" : "")
    }
    onClick={() => props.setTheme("dark")}
    aria-label="Switch to dark theme"
    aria-pressed={props.theme === "dark"}
  >
    <Moon className="theme-switcher__icon" />
  </button>
</div>
    )
}