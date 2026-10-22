import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./monitor.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

async function deleteMonitor(monitorId, monitors, setMonitors) {
  try {
    const deleteMonitor = await fetch(`${backendURL}/monitors/${monitorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (deleteMonitor.ok) {
      setMonitors(monitors.filter((monitor) => monitor.id !== monitorId));

      return deleteMonitor.message;
    } else if (!deleteMonitor.ok) {
      console.log(`Erro na rede: ${deleteMonitor.status}`);
    }
  } catch (err) {
    console.log(`Erro ao deletar monitor. Erro: ${err}`);
  }
}

function MonitorCard({ monitor, monitors, setMonitor }) {
  const isOnline = monitor.status === "UP";

  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <article className={style.monitorCard}>
      <div className={style.monitorHeader}>
        <div>
          <span className={style.type}>{monitor.type}</span>

          <h2>{monitor.name}</h2>

          <span className={style.monitorHost}>
            {monitor.host}
            {monitor.port ? `:${monitor.port}` : ""}
            {monitor.path ? `/${monitor.path}` : ""}
          </span>
        </div>

        <span
          className={`${style.statusBadge} ${
            isOnline ? style.statusOnline : style.statusOffline
          }`}
        >
          <span className={style.statusDot}></span>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className={style.monitorDivider}></div>

      <div className={style.monitorStats}>
        <div className={style.stat}>
          <span>Uptime</span>
          <strong>
            {monitor.uptimePercentage != null
              ? `${Number(monitor.uptimePercentage).toFixed(2)}%`
              : "-"}
          </strong>
        </div>

        <div className={style.stat}>
          <span>Latência</span>
          <strong>
            {monitor.avgLatency != null
              ? `${monitor.avgLatency.toFixed(2)} ms`
              : "—"}
          </strong>
        </div>

        <div className={style.stat}>
          <span>Status</span>
          <strong>{isOnline ? "Operando" : "Indisponível"}</strong>
        </div>
      </div>

      <div className={style.monitorFooter}>
        <span>
          Monitor criado em{" "}
          {monitor.createdAt
            ? new Date(monitor.createdAt).toLocaleDateString("pt-BR")
            : "—"}
        </span>

        <div className={style.menuContainer}>
          <button
            className={style.menuButton}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div className={style.menu}>
              <Link to={`/monitors/${monitor.id}`} className={style.menuItem}>
                Ver detalhes
              </Link>

              <button className={style.menuItem}>Editar</button>

              <button
                className={`${style.menuItem} ${style.delete}`}
                onClick={() => deleteMonitor(monitor.id, monitors, setMonitor)}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MonitorCard;
