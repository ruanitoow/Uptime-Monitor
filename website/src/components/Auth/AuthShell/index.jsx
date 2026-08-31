import Brand from "../../Brand";
import ThemeToggle from "../../ThemeToggle";
import style from "./authShell.module.css";

function AuthShell({ eyebrow, title, description, children }) {
  return (
    <main className={style.page}>
      <header className={style.header}>
        <Brand />
        <ThemeToggle />
      </header>

      <div className={style.content}>
        <section className={style.visualPanel}>
          <span className={style.eyebrow}>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>

          <div className={style.statusMockup}>
            <div className={style.statusRow}>
              <span className={style.dot} />
              <div><strong>api.exemplo.com</strong><small>Operacional</small></div>
              <b>118ms</b>
            </div>
            <div className={style.statusRow}>
              <span className={style.dot} />
              <div><strong>app.exemplo.com</strong><small>Operacional</small></div>
              <b>86ms</b>
            </div>
            <div className={style.miniChart} aria-hidden="true" />
          </div>
        </section>

        <section className={style.formPanel}>
          {children}
        </section>
      </div>
    </main>
  );
}

export default AuthShell;
