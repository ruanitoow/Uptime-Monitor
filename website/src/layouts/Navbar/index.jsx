import { useState } from "react";
import Action from "../../components/Buttons/Actions";
import Brand from "../../components/Brand";
import ContainerFluid from "../../components/Containers/ContainerFluid";
import ThemeToggle from "../../components/ThemeToggle";
import style from "./navbar.module.css";

const navbarLinks = [
  { name: "Recursos", url: "#recursos" },
  { name: "Como funciona", url: "#como-funciona" },
  { name: "Visão geral", url: "#visao-geral" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <ContainerFluid>
      <header className={style.header}>
        <nav className={style.navbar} aria-label="Navegação principal">
          <div className={style.logoSide}>
            <Brand />
          </div>

          <div className={style.links}>
            {navbarLinks.map((link) => (
              <a key={link.url} href={link.url}>
                {link.name}
              </a>
            ))}
          </div>

          <div className={style.desktopActions}>
            <ThemeToggle />
            <Action name="Entrar" url="/login" variant="ghost" />
            <Action name="Criar conta" url="/register" variant="primary" />
          </div>

          <div className={style.mobileControls}>
            <ThemeToggle />
            <button
              className={`${style.menuButton} ${menuOpen ? style.menuButtonOpen : ""}`}
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={`${style.mobileMenu} ${menuOpen ? style.mobileMenuOpen : ""}`}
          >
            <div className={style.mobileLinks}>
              {navbarLinks.map((link) => (
                <a key={link.url} href={link.url} onClick={closeMenu}>
                  {link.name}
                </a>
              ))}
            </div>

            <div className={style.mobileActions}>
              <Action name="Entrar" url="/login" variant="secondary" />
              <Action name="Criar conta" url="/register" variant="primary" />
            </div>
          </div>
        </nav>
      </header>
    </ContainerFluid>
  );
}

export default Navbar;
