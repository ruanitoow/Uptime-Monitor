import Brand from "../../components/Brand";
import Container from "../../components/Containers/Container";
import style from "./footer.module.css";

const groups = [
  { title: "Produto", links: ["Recursos", "Status", "Preços"] },
  { title: "Empresa", links: ["Sobre", "Blog", "Contato"] },
  { title: "Suporte", links: ["Documentação", "Ajuda", "Contato"] },
];

function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        <div className={style.grid}>
          <div className={style.brandColumn}>
            <Brand />
            <p>Monitoramento de sites, APIs e serviços com foco em clareza e resposta rápida.</p>
          </div>

          {groups.map((group) => (
            <div key={group.title} className={style.group}>
              <strong>{group.title}</strong>
              {group.links.map((link) => (
                <a key={link} href="#recursos">{link}</a>
              ))}
            </div>
          ))}
        </div>

        <div className={style.bottom}>
          <span>© 2026 Uptime Monitor.</span>
          <span>Um projeto Nexora Studio.</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
