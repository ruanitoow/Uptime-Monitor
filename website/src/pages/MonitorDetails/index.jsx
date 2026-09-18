import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import style from "./details.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function MonitorDetailsPage() {
  const { id } = useParams();
  const [period, setPeriod] = useState("24h");
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMonitorData() {
      try {
        const detailsMonitor = await fetch(
          `${backendURL}/monitors/${id}?period=${period}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (detailsMonitor.ok) {
          const data = await detailsMonitor.json();
          setMonitor(data);
        } else {
          console.error("Falha ao carregar monitor:", detailsMonitor.status);
        }
      } catch (err) {
        console.log(`Erro ao pegar monitor. Erro: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadMonitorData();
  }, [id, period]);

  const isOnline = monitor?.checks?.[0]?.status === "UP";

  return (
    <DashboardLayout>
      <div className={style.container}>
        {/* Voltar para a Dashboard */}
        <Link to="/dashboard" className={style.backLink}>
          ← Voltar para todos os monitores
        </Link>

        {/* Cabeçalho do Monitor */}
        <header className={style.header}>
          <div className={style.headerInfo}>
            <span className={style.typeBadge}>{monitor?.type ?? "HTTP"}</span>
            <h1 className={style.title}>{monitor?.name ?? "Carregando..."}</h1>
            <span className={style.host}>
              {monitor?.host}
              {monitor?.port ? `:${monitor.port}` : ""}
              {monitor?.path ? `/${monitor.path}` : ""}
            </span>
          </div>

          <div
            className={`${style.statusBadge} ${
              isOnline ? style.statusOnline : style.statusOffline
            }`}
          >
            <span className={style.statusDot}></span>
            {isOnline ? "Operando" : "Indisponível"}
          </div>
        </header>

        {/* Barra de Filtro de Período */}
        <div className={style.periodControls}>
          <h3>Métricas de Desempenho</h3>
          <div className={style.buttonGroup}>
            <button
              type="button"
              className={`${style.periodButton} ${
                period === "24h" ? style.periodButtonActive : ""
              }`}
              onClick={() => setPeriod("24h")}
            >
              24 Horas
            </button>
            <button
              type="button"
              className={`${style.periodButton} ${
                period === "7d" ? style.periodButtonActive : ""
              }`}
              onClick={() => setPeriod("7d")}
            >
              7 Dias
            </button>
            <button
              type="button"
              className={`${style.periodButton} ${
                period === "30d" ? style.periodButtonActive : ""
              }`}
              onClick={() => setPeriod("30d")}
            >
              30 Dias
            </button>
          </div>
        </div>

        {/* Cards com as Métricas Calculadas */}
        <div className={style.statsGrid}>
          <div className={style.statCard}>
            <span className={style.statLabel}>Uptime ({period})</span>
            <strong className={style.statValue}>
              {monitor?.uptimePercentage != null
                ? `${Number(monitor.uptimePercentage).toFixed(2)}%`
                : "—"}
            </strong>
          </div>

          <div className={style.statCard}>
            <span className={style.statLabel}>Latência Média</span>
            <strong className={style.statValue}>
              {monitor?.avgLatency != null
                ? `${Number(monitor.avgLatency).toFixed(2)} ms`
                : "—"}
            </strong>
          </div>

          <div className={style.statCard}>
            <span className={style.statLabel}>Verificações no Período</span>
            <strong className={style.statValue}>
              {monitor?.checks?.length ?? 0}
            </strong>
          </div>

          <div className={style.statCard}>
            <span className={style.statLabel}>Última Latência</span>
            <strong className={style.statValue}>
              {monitor?.checks?.[0]?.latency != null
                ? `${monitor.checks[0].latency} ms`
                : "—"}
            </strong>
          </div>
        </div>

        {/* Seção do Gráfico (Aqui vai entrar o Recharts!) */}
        <section className={style.chartSection}>
          <div className={style.sectionHeader}>
            <h3 className={style.sectionTitle}>Histórico de Latência (ms)</h3>
          </div>
          <div className={style.chartContainer}>
            {/* O componente Recharts LineChart será plugado aqui */}
            <span>Gráfico de Latência (Recharts)</span>
          </div>
        </section>

        {/* Tabela com os Checks Recentes */}
        <section className={style.tableSection}>
          <h3 className={style.sectionTitle}>Histórico de Verificações</h3>
          <div className={style.tableWrapper}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Data e Hora</th>
                  <th>Status</th>
                  <th>Código HTTP</th>
                  <th>Latência</th>
                </tr>
              </thead>
              <tbody>
                {monitor?.checks && monitor.checks.length > 0 ? (
                  monitor.checks.slice(0, 20).map((check) => (
                    <tr key={check.id}>
                      <td>
                        {new Date(check.checkedAt).toLocaleString("pt-BR")}
                      </td>
                      <td>
                        <span
                          className={`${style.badge} ${
                            check.status === "UP"
                              ? style.badgeUp
                              : style.badgeDown
                          }`}
                        >
                          {check.status}
                        </span>
                      </td>
                      <td>{check.statusCode ?? "—"}</td>
                      <td>{check.latency} ms</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={style.emptyChecks}>
                      Nenhum check registrado para este período.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default MonitorDetailsPage;
