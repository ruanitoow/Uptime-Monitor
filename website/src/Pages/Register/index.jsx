import AuthForm from "../../components/Auth/AuthForm";
import AuthShell from "../../components/Auth/AuthShell";

const registerFields = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Seu nome",
    autoComplete: "name",
  },
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
    placeholder: "Crie uma senha",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    type: "password",
    placeholder: "Repita sua senha",
    autoComplete: "new-password",
  },
];

function RegisterPage() {
  return (
    <AuthShell
      eyebrow="COMECE AGORA"
      title="Seu primeiro monitor pode estar online em poucos minutos."
      description="Crie sua conta e, quando o backend estiver conectado, você poderá cadastrar serviços e acompanhar toda a operação."
    >
      <AuthForm
        title="Criar conta"
        description="Preencha seus dados para começar."
        fields={registerFields}
        submitText="Criar conta"
        footerText="Já possui uma conta?"
        footerLinkText="Entrar"
        footerUrl="/login"
      />
    </AuthShell>
  );
}

export default RegisterPage;
