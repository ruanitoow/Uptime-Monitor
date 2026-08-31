import { useState } from "react";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import style from "./dashboardlayout.module.css";

function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className={style.layout}>
      <Sidebar open={menuOpen} onClose={closeMenu} />

      {menuOpen && (
        <button
          className={style.backdrop}
          type="button"
          aria-label="Fechar menu da dashboard"
          onClick={closeMenu}
        />
      )}

      <div className={style.workspace}>
        <Header onMenuToggle={() => setMenuOpen((current) => !current)} />

        <main className={style.main}>
          <div className={style.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
