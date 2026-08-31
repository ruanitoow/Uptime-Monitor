import Action from "../../components/Buttons/Actions";
import Container from "../../components/Containers/Container";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import style from "./home.module.css";

const stats = [
  { value: "99,99%", label: "Uptime monitorado" },
  { value: "24/7", label: "Verificações contínuas" },
  { value: "67ms", label: "Latência de exemplo" },
  { value: "Instantâneo", label: "Alertas de incidentes" },
];

const features = [
  {
    icon: "↗",
    title: "Monitoramento",
    description: "Acompanhe sites, APIs e endpoints em um painel simples, com status e última verificação sempre visíveis.",
  },
  {
    icon: "⌁",
    title: "Métricas",
    description: "Visualize uptime, latência, histórico de checagens e evolução de desempenho sem depender de dados mockados.",
  },
  {
    icon: "!",
    title: "Alertas",
    description: "Receba notificações quando um serviço sair do ar e acompanhe o ciclo completo dos incidentes.",
  },
];

const steps = [
  {
    number: "01",
    title: "Cadastre seu monitor",
    description: "Informe a URL do site ou serviço que deseja acompanhar.",
  },
  {
    number: "02",
    title: "Nós verificamos continuamente",
    description: "O sistema executa checks, mede latência e registra cada resultado.",
  },
  {
    number: "03",
    title: "Acompanhe e reaja",
    description: "Consulte histórico, incidentes e métricas em um só lugar.",
  },
];

function DashboardPreview({ expanded = false }) {
  return (
    <div className={`${style.dashboardPreview} ${expanded ? style.dashboardExpanded : ""}`}>
      <div className={style.previewTopbar}>
        <div>
          <span className={style.previewEyebrow}>Visão geral</span>
          <strong>Saúde dos seus serviços</strong>
        </div>
        <span className={style.previewPill}>Últimas 24h</span>
      </div>

      <div className={style.previewStats}>
        <div><span>Status geral</span><strong className={style.successText}>Operacional</strong></div>
        <div><span>Uptime médio</span><strong>99,99%</strong></div>
        <div><span>Latência média</span><strong>142ms</strong></div>
      </div>

      <div className={style.previewGrid}>
        <div className={style.chartCard}>
          <div className={style.chartHeader}><span>Latência</span><strong>142ms</strong></div>
          <svg viewBox="0 0 480 150" preserveAspectRatio="none" aria-label="Gráfico ilustrativo de latência">
            <defs>
              <linearGradient id={expanded ? "areaExpanded" : "areaHero"} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className={style.chartArea} fill={`url(#${expanded ? "areaExpanded" : "areaHero"})`} d="M0 117 L35 90 L72 104 L112 61 L154 82 L193 69 L233 102 L272 55 L311 76 L349 45 L389 66 L430 38 L480 58 L480 150 L0 150 Z" />
            <path className={style.chartLine} d="M0 117 L35 90 L72 104 L112 61 L154 82 L193 69 L233 102 L272 55 L311 76 L349 45 L389 66 L430 38 L480 58" />
          </svg>
        </div>

        <div className={style.incidentCard}>
          <span>Último incidente</span>
          <strong>API de pagamentos</strong>
          <p>Resolvido após 9 minutos</p>
          <small className={style.successText}>● Resolvido</small>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className={style.page}>
      <Navbar />

      <main>
        <section className={style.hero}>
          <Container>
            <div className={style.heroGrid}>
              <div className={style.heroCopy}>
                <span className={style.badge}>● Monitoramento simples para serviços modernos</span>
                <h1>
                  Saiba que seu serviço caiu <span>antes dos seus usuários.</span>
                </h1>
                <p>
                  Monitore sites, APIs e serviços, acompanhe uptime, latência e incidentes e concentre tudo em uma única dashboard.
                </p>
                <div className={style.heroActions}>
                  <Action name="Começar agora" url="/register" variant="primary" />
                  <Action name="Ver como funciona" url="#como-funciona" variant="secondary" />
                </div>
                <div className={style.heroChecks}>
                  <span>✓ Configuração rápida</span>
                  <span>✓ Sem cartão para começar</span>
                </div>
              </div>

              <div className={style.heroVisual}>
                <div className={style.heroGlow} />
                <DashboardPreview />
              </div>
            </div>
          </Container>
        </section>

        <Container>
          <section className={style.statStrip} aria-label="Resumo de métricas">
            {stats.map((stat) => (
              <div key={stat.label} className={style.statItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
        </Container>

        <section id="recursos" className={style.section}>
          <Container>
            <div className={style.sectionHeading}>
              <span>RECURSOS</span>
              <h2>O essencial para acompanhar o que importa.</h2>
              <p>Começamos simples e evoluímos conforme o produto realmente precisar de novos recursos.</p>
            </div>
            <div className={style.featureGrid}>
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </Container>
        </section>

        <section id="como-funciona" className={`${style.section} ${style.softSection}`}>
          <Container>
            <div className={style.sectionHeading}>
              <span>COMO FUNCIONA</span>
              <h2>Da URL ao histórico em três etapas.</h2>
            </div>
            <div className={style.stepsGrid}>
              {steps.map((step) => (
                <StepCard key={step.number} {...step} />
              ))}
            </div>
          </Container>
        </section>

        <section id="visao-geral" className={style.section}>
          <Container>
            <div className={style.productGrid}>
              <DashboardPreview expanded />
              <div className={style.productCopy}>
                <span>VISÃO COMPLETA</span>
                <h2>Uptime, latência, histórico e incidentes em um só lugar.</h2>
                <p>
                  A dashboard foi pensada para responder rápido: o serviço está online, quanto demorou para responder e o que aconteceu quando ficou indisponível?
                </p>
                <ul>
                  <li>Dashboard com estado atual</li>
                  <li>Histórico de verificações</li>
                  <li>Métricas de desempenho</li>
                  <li>Incidentes e alertas</li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className={style.ctaSection}>
          <Container>
            <div className={style.ctaCard}>
              <div>
                <span>PRONTO PARA COMEÇAR?</span>
                <h2>Proteja a experiência dos seus usuários.</h2>
                <p>Crie sua conta e configure seu primeiro monitor em poucos minutos.</p>
              </div>
              <Action name="Criar minha conta" url="/register" variant="secondary" />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
