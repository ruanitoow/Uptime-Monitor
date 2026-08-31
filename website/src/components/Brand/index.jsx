import style from "./brand.module.css";

function Brand({ compact = false }) {
  return (
    <a className={`${style.brand} ${compact ? style.compact : ""}`} href="/" aria-label="Uptime Monitor">
      <span className={style.mark} aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M3 17h5l2.2-5 4.2 11 3.2-8 2.2 2H29" />
        </svg>
      </span>
      <span className={style.wordmark}>
        <strong>Uptime</strong>
        <span>Monitor</span>
      </span>
    </a>
  );
}

export default Brand;
