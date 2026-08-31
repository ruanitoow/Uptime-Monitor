import { useEffect, useState } from "react";
import style from "./themeToggle.module.css";

function getInitialTheme() {
  const savedTheme = localStorage.getItem("uptime-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("uptime-theme", theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className={style.toggle}
      type="button"
      aria-label={`Ativar tema ${nextTheme}`}
      title={`Ativar tema ${nextTheme}`}
      onClick={() => setTheme(nextTheme)}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}

export default ThemeToggle;
