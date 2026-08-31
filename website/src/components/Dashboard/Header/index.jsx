import ThemeToggle from "../../ThemeToggle";
import style from "./header.module.css";

function Header({ onMenuToggle }) {
  return (
    <header className={style.header}>
      <div className={style.headerInner}>
        <div className={style.leftSide}>
          <button
            className={style.menuButton}
            type="button"
            aria-label="Abrir menu da dashboard"
            onClick={onMenuToggle}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className={style.pageContext}>
            <span>Painel</span>
            <strong>Visão geral</strong>
          </div>
        </div>

        <div className={style.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
