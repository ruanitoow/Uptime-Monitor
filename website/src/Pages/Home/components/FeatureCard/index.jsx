import style from "./featureCard.module.css";

function FeatureCard({ icon, title, description }) {
  return (
    <article className={style.card}>
      <span className={style.icon} aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#visao-geral">Saiba mais <span aria-hidden="true">→</span></a>
    </article>
  );
}

export default FeatureCard;
