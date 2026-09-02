import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm";
import AuthShell from "../../components/Auth/AuthShell";
import Popup from "../../components/Popup";

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
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    open: false,
    variant: "error",
    title: "",
    message: "",
  });

  async function handleLogin(values) {
    const { email, password } = values;

    const url = 'http://localhost:8080/login'

    const payload = {
      email,
      password
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: "include"
      });
      if (!response.ok) {
        const data = await response.json()
        setPopup({
          open: true,
          variant: "error",
          title: data.status,
          message: data.erro,
        });
        return;
      } 
    } catch (e){
      setPopup({
          open: true,
          variant: "error",
          title: "500 Sem conexão com o servidor!",
          message: "Não conseguimos contato com o servidor, tente novamente mais tarde ou entre em contato com o suporte",
        });
        return;
    }
    navigate("/dashboard")
  }
  return (
    <AuthShell
      eyebrow="BEM-VINDO DE VOLTA"
      title="Acompanhe seus serviços sem perder nenhum incidente."
      description="Entre na sua conta para acessar monitores, histórico, métricas e alertas em uma única dashboard."
    >
      <Popup
        {...popup}
      />
      <AuthForm
        title="Entrar"
        description="Use suas credenciais para acessar a plataforma."
        fields={loginFields}
        onSubmit={handleLogin}
        submitText="Entrar"
        footerText="Ainda não tem uma conta?"
        footerLinkText="Criar conta"
        footerUrl="/register"
      />
    </AuthShell>
  );
}

export default LoginPage;