import { NavLink } from "react-router-dom";
import Brand from "../../Brand";
import style from "./sidebar.module.css";

const navigation = [
  {
    label: "Visão geral",
    to: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-12h6V4h-6v4Z" />
      </svg>
    ),
  },
];

const upcomingNavigation = [
  {
    label: "Monitores",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 12h4l2.1-5 4.4 10 2.2-5H21" />
      </svg>
    ),
  },
  {
    label: "Incidentes",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5 21 20H3L12 3.5Zm0 5.5v5.2m0 2.9v.1" />
      </svg>
    ),
  },
];

function Sidebar({ open = false, onClose }) {
  return (
    <aside className={`${style.sidebar} ${open ? style.open : ""}`}>
      <div className={style.brandRow}>
        <Brand />
        <button
          className={style.closeButton}
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav className={style.navigation} aria-label="Navegação da dashboard">
        <div className={style.navGroup}>
          <span className={style.groupLabel}>Workspace</span>

          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `${style.navItem} ${isActive ? style.active : ""}`
              }
            >
              <span className={style.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          {upcomingNavigation.map((item) => (
            <button
              key={item.label}
              className={`${style.navItem} ${style.disabled}`}
              type="button"
              disabled
            >
              <span className={style.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className={style.sidebarFooter}>
        <div className={style.statusDot} aria-hidden="true" />
        <div>
          <strong>Uptime Monitor</strong>
          <span>Ambiente operacional</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
