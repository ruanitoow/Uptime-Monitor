import DashboardLayout from "../../layouts/DashboardLayout";
import style from "./dashboard.module.css";

function DashboardPage() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}

export default DashboardPage;
