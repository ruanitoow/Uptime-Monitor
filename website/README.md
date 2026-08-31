# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Frontend implementado nesta fase

- Homepage responsiva com Navbar, Hero, métricas, recursos, fluxo de funcionamento, preview da dashboard, CTA e Footer.
- Light mode e dark mode com persistência em `localStorage` e respeito ao tema preferido do sistema na primeira visita.
- Páginas `Login` e `Register` componentizadas por meio de `AuthShell` e `AuthForm`.
- O formulário de autenticação é visual nesta fase: a integração com API será feita posteriormente.
- React Router **não foi implementado de propósito**. As páginas estão prontas para serem conectadas pelo Router posteriormente.

### Para visualizar Login/Register antes do Router

Temporariamente, altere o componente importado em `src/App.jsx` para `LoginPage` ou `RegisterPage`. Depois, reverta para `HomePage` e implemente as rotas normalmente.
