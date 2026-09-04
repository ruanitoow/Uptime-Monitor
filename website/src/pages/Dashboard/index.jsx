import DashboardLayout from "../../layouts/DashboardLayout";
import CreateMonitor from "../../components/CreateMonitor";
import { useEffect, useState } from "react";
import style from "./dashboard.module.css";

let backendURL = import.meta.env.VITE_BACKEND_URL

const monitorFields = [
  {
    name: "host",
    label: "Host",
    type: "text",
    placeholder: "exemplo.com.br",
  },
  {
    name: "port",
    label: "Porta",
    type: "text",
    placeholder: "Digite a porta do seu serviço",
  },
  {
    name: "name",
    label: "Nome do Monitor",
    type: "text",
    placeholder: "Digite o nome desejado para este monitor"
  },
  {
    name: "path",
    label: "Path",
    type: "text",
    required: false,
    placeholder: "Digite o path ex.: loja/login"
  }
];

function withMonitors(monitors) {
  return (
    <section className={style.monitorsSection}>
      <div className={style.pageHeading}>
        <div>
          <span className={style.eyebrow}>Dashboard</span>
          <h1>Seus monitores</h1>
          <p>
            Acompanhe a disponibilidade e o desempenho dos seus serviços.
          </p>
        </div>
      </div>

      <div className={style.monitorGrid}>
        {monitors.map((monitor) => {
          const isOnline = monitor.status === "UP" || monitor.active === true;

          return (
            <article key={monitor.id} className={style.monitorCard}>
              <div className={style.monitorHeader}>
                <div>
                  <span className={style.monitorType}>
                    {monitor.type}
                  </span>

                  <h2>{monitor.name}</h2>

                  <span className={style.monitorHost}>
                    {monitor.host}
                    {monitor.port ? `:${monitor.port}` : ""}
                    {monitor.path ? `/${monitor.path}` : ""}
                  </span>
                </div>

                <span
                  className={`${style.statusBadge} ${
                    isOnline
                      ? style.statusOnline
                      : style.statusOffline
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
                    {monitor.uptime ?? "—"}
                  </strong>
                </div>

                <div className={style.stat}>
                  <span>Latência</span>
                  <strong>
                    {monitor.latency != null
                      ? `${monitor.latency} ms`
                      : "—"}
                  </strong>
                </div>

                <div className={style.stat}>
                  <span>Status</span>
                  <strong>
                    {isOnline ? "Operando" : "Indisponível"}
                  </strong>
                </div>
              </div>

              <div className={style.monitorFooter}>
                <span>
                  Monitor criado em{" "}
                  {monitor.createdAt
                    ? new Date(monitor.createdAt).toLocaleDateString(
                        "pt-BR"
                      )
                    : "—"}
                </span>

                <button
                  type="button"
                  className={style.monitorAction}
                >
                  Ver detalhes
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function withoutMonitors() {
  return (
    <>
      <section className={style.pageHeading}>
        <div>
          <span className={style.eyebrow}>Dashboard</span>
          <h1>Visão geral</h1>
          <p>Acompanhe o estado dos seus monitores e a atividade recente em um só lugar.</p>
        </div>
      </section>

      <section className={style.emptyState} aria-labelledby="dashboard-empty-title">
        <div className={style.emptyIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3 12h4l2.2-5 4.3 10 2.3-5H21" />
          </svg>
        </div>

        <div className={style.emptyCopy}>
          <span>Nenhum monitor configurado</span>
          <h2 id="dashboard-empty-title">Seu painel começa aqui.</h2>
          <p>
            Quando seus monitores forem adicionados, disponibilidade, latência e histórico
            aparecerão nesta área.
          </p>
        </div>
      </section>
    </>
  )
}

function DashboardPage() {
  const [isCreateMonitorOpen, setIsCreateMonitorOpen] = useState(false);
  const [monitors, setMonitors] = useState([])

  useEffect(() => {
    async function getMonitors() {
      const resposta = await fetch(`${backendURL}/monitors`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const data = await resposta.json()
      setMonitors(data)
      return data;
    }
    getMonitors();
  }, [])

  async function handleRegister(values) {
    const { host, type, port, name, path } = values;
    const portNumber = Number(port)
    const payload = {
      host,
      type,
      port: portNumber,
      name,
      path,
    }
    try {
      const resposta = await fetch(`${backendURL}/monitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      if (!resposta.ok) {
        throw new Error(`Erro na rede: ${resposta.status}`);
      }

      setIsCreateMonitorOpen(false)
    } catch (erro) {
      console.error('Falha ao buscar dados:', erro);
    }
  }



  return (
    <DashboardLayout>
      {monitors.length > 0
        ? withMonitors(monitors)
        : withoutMonitors()}
      {isCreateMonitorOpen && (
        <CreateMonitor
          submitText="Criar Monitor"
          fields={monitorFields}
          onSubmit={handleRegister}
          onClose={() => setIsCreateMonitorOpen(false)}
        />
      )}
      <button
        className={style.createMenu}
        onClick={() => setIsCreateMonitorOpen(true)}
      >
        + Criar Monitor
      </button>
    </DashboardLayout>
  );
}

export default DashboardPage;
