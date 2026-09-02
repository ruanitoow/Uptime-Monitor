import style from "./stepCard.module.css";

function StepCard({ number, title, description }) {
  return (
    <article className={style.step}>
      <span className={style.number}>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default StepCard;
