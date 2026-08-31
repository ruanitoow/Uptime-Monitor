import AuthForm from "../../components/Auth/AuthForm";
import AuthShell from "../../components/Auth/AuthShell";

const loginFields = [
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "voce@exemplo.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
    autoComplete: "current-password",
  },
];

function LoginPage() {
  return (
    <AuthShell
      eyebrow="BEM-VINDO DE VOLTA"
      title="Acompanhe seus serviços sem perder nenhum incidente."
      description="Entre na sua conta para acessar monitores, histórico, métricas e alertas em uma única dashboard."
    >
      <AuthForm
        title="Entrar"
        description="Use suas credenciais para acessar a plataforma."
        fields={loginFields}
        submitText="Entrar"
        footerText="Ainda não tem uma conta?"
        footerLinkText="Criar conta"
        footerUrl="/register"
      />
    </AuthShell>
  );
}

export default LoginPage;
