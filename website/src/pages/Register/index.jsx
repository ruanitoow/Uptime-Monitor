import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import AuthShell from "../../components/Auth/AuthShell";
import Popup from "../../components/Popup";

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
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    open: false,
    variant: "error",
    title: "",
    message: "",
  });

  async function handleRegister(values) {
    const { name, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setPopup({
        open: true,
        variant: "error",
        title: "As senhas não coincidem",
        message: 'Os campos "Senha" e "Confirmar senha" precisam ser iguais.',
      });

      return;
    }

    const url = 'http://localhost:8080/register'

    const payload = {
      name,
      email,
      password
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      setPopup({
        open: true,
        variant: "error",
        title: "500 Internal Error",
        message: 'Não conseguimos contato com o sistema, tente novamente mais tarde!',
      });
      return;
    }
    navigate("/login")
  }
  return (
    <AuthShell
      eyebrow="COMECE AGORA"
      title="Seu primeiro monitor pode estar online em poucos minutos."
      description="Crie sua conta e, quando o backend estiver conectado, você poderá cadastrar serviços e acompanhar toda a operação."
    >
      <Popup
        {...popup}
      />
      <AuthForm
        title="Criar conta"
        description="Preencha seus dados para começar."
        fields={registerFields}
        onSubmit={handleRegister}
        submitText="Criar conta"
        footerText="Já possui uma conta?"
        footerLinkText="Entrar"
        footerUrl="/login"
      />
    </AuthShell>
  );
}

export default RegisterPage;