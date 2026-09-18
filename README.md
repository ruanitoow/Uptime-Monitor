# 📡 Uptime Monitor

Plataforma Full Stack para monitoramento de disponibilidade, latência e histórico de serviços (HTTP, HTTPS e TCP).

O projeto é desenvolvido em dupla como ambiente de aprendizado prático de desenvolvimento **Frontend + Backend**, arquitetura, banco de dados, trabalho colaborativo e evolução gradual até uma aplicação pronta para produção.

---

## 🎯 Visão geral

O Uptime Monitor permite aos usuários cadastrar serviços e acompanhar sua disponibilidade por meio de checagens periódicas. O sistema utiliza um worker em background para realizar checagens periódicas e registrar métricas como status, latência e código HTTP, consolidando os dados em uma dashboard interativa.

---

## 🚀 Estado atual

Atualmente o sistema já conta com autenticação de usuários, gerenciamento de monitores e um worker que roda em background (loop infinito) para realizar checagens ativas (HTTP, HTTPS, TCP). O frontend permite cadastro e login de usuários, além de exibir a lista de monitores cadastrados com o status mais recente retornado pela API.

O fluxo de autenticação via cookies (HTTPOnly) está estabelecido, e a comunicação Frontend ↔ Backend ocorre de forma autenticada.

---

## 🧩 Funcionalidades

### ✅ Implementadas

- **Autenticação:** Cadastro de usuários e login com JWT armazenado em cookie HttpOnly.
- **Gerenciamento de Monitores (Backend & Frontend):** Criação e listagem de monitores.
- **Tipos de Monitoramento:** Suporte para HTTP, HTTPS e TCP.
- **Worker de Checagem (Backend):** Execução em background para aferir latência, status e `statusCode` dos monitores ativos, aguardando 5 segundos entre os ciclos de checagem.
- **Dashboard (Frontend):** Interface de visualização da lista de monitores e seus status mais recentes.
- **Página de Detalhes do Monitor (Frontend):** Visualização individual com métricas calculadas (uptime %, latência média), alternância de período (24h, 7d, 30d) e tabela de histórico.
- **Camada de Proteção:** Proteção de rotas do backend usando middlewares de validação e restrição de acesso a recursos apenas pelo dono (Usuário).
- **API de Detalhes e Deleção (Backend):** Endpoints para buscar histórico detalhado e excluir monitores, com deleção em cascata (`onDelete: Cascade`) no banco de dados.

### 🟡 Parcialmente implementadas

- **Exclusão de Monitores (Frontend):** O endpoint `DELETE` existe no backend, mas a interface não possui botão ou fluxo para chamá-lo.
- **Logout:** O frontend limpa o contexto local do usuário, mas não há um endpoint no backend para invalidar/limpar o cookie da sessão.

### ⬜ Planejadas / Não implementadas

- **Sistema de Incidentes:** Abertura e fechamento de incidentes quando um serviço cai.
- **Notificações:** Alertas via Webhook, Discord, Email, etc.
- **Métricas Avançadas:** Gráficos (Recharts) detalhando histórico, cálculo de uptime % e latência média.
- **Paginação/Limitação de Checagens no Frontend:** Lidar visualmente com um longo histórico.

---

## 🧱 Stack

**Frontend:**

- React (Vite)
- React Router (Navegação)
- CSS Modules (Estilização)
- Context API (Gerenciamento de sessão de usuário)

**Backend:**

- Node.js
- Express 5.2 (API REST)
- Prisma ORM
- JWT e Bcrypt (Autenticação e hash de senhas)
- Zod (Validação de schemas)

**Banco de Dados:**

- PostgreSQL

---

## 🏗️ Arquitetura e Fluxos Principais

O backend segue a arquitetura de camadas:
`Route` → `Middleware` (Validações Zod / JWT) → `Controller` → `Service` → `Prisma` → `PostgreSQL`

### Fluxo de Checagem (Worker)

O worker de checagem opera paralelamente à API principal. Ele busca todos os monitores ativos no banco de dados, executa a requisição correspondente (TCP ou HTTP/HTTPS) e persiste os resultados (Check) no banco de dados. Após concluir um ciclo de checagem dos monitores ativos, o worker aguarda 5 segundos via `node:timers/promises` antes de iniciar o próximo ciclo.

### Fluxo de Autenticação

1. Usuário envia credenciais para `/login`.
2. Backend valida, assina um JWT e o envia como um cookie `HttpOnly`.
3. Frontend acessa páginas protegidas, enviando `credentials: "include"`.
4. Backend `validateAuth` verifica o cookie e injeta o usuário no `req.user`.

---

## 🗂️ Estrutura do Projeto

O projeto é dividido em dois diretórios principais: `server` (Backend) e `website` (Frontend).

```text
Uptime-Monitor/
├── server/
│   ├── migrations/
│   ├── schema.prisma
│   ├── prisma.config.js
│   └── src/
│       ├── checkers/        # Lógica de requests (HTTP/TCP)
│       ├── controllers/     # Controladores das rotas
│       ├── libs/            # Instâncias globais (ex: Prisma Client)
│       ├── middlewares/     # Interceptadores (Autenticação, Validação Zod, Tratamento de erro)
│       ├── routes/          # Definição dos endpoints
│       ├── services/        # Regras de negócio e acesso ao BD
│       ├── validations/     # Schemas Zod
│       ├── worker/          # Worker autônomo rodando em background
│       └── index.js         # Entrypoint da API
│
└── website/
    └── src/
        ├── components/      # Componentes reutilizáveis (Botões, Cards, Dashboard Layout)
        ├── contexts/        # Contextos do React (ex: UserContext)
        ├── layouts/         # Estruturas de página (Sidebar, Navbar)
        ├── pages/           # Views principais (Home, Login, Register, Dashboard)
        ├── routes/          # Definição do React Router
        ├── style/           # CSS global
        └── main.jsx         # Entrypoint do React
```

---

## 🗄️ Banco de Dados

O banco relacional baseia-se em 3 entidades principais:

- **User**: Autenticação e posse de recursos. Relaciona-se 1:N com `Monitor`.
- **Monitor**: Configurações de serviço (Host, Port, Path, Type). Relaciona-se 1:N com `Check`.
- **Check**: O resultado de cada checagem efetuada pelo worker (Status UP/DOWN, StatusCode, Latency, data/hora da checagem (`checkedAt`)).

---

## 🔌 API

Endpoints principais do backend atualmente:

**Autenticação e Usuário**

- `POST /register`: Cria nova conta.
- `POST /login`: Autentica usuário e retorna cookie HTTPOnly.
- `POST /user/logout`: Encerra a sessão limpando o cookie de autenticação.
- `GET /user/data`: Retorna os dados do usuário logado baseado no cookie.

**Monitores**

- `POST /monitors`: Cadastra um monitor.
- `GET /monitors`: Lista todos os monitores do usuário logado (trazendo o último Check).
- `GET /monitors/:id?period=24h|7d|30d`: Traz detalhes do monitor, checks filtrados pelo período e métricas calculadas (`uptimePercentage` e `avgLatency`).
- `DELETE /monitors/:id`: Deleta monitor e suas checagens associadas.

---

## ⚙️ Configuração e Execução

### Variáveis de Ambiente

Crie um `.env` tanto na raiz do backend (`/server`) quanto do frontend (`/website`), baseando-se nos seus respectivos `.env.example`.

**Backend (`server/.env`):**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/uptime?schema=public"
PORT=3000
SECRET="sua_chave_secreta"
```

**Frontend (`website/.env`):**

```env
VITE_BACKEND_URL="http://localhost:3000"
```

### Como Executar

O projeto exige **Node.js** e **PostgreSQL**.

1. **Instalar dependências (ambos):**
   No diretório `/server`: `npm install`
   No diretório `/website`: `npm install`

2. **Configurar o banco:**
   No diretório `/server`: `npx prisma migrate dev`

3. **Iniciar a API (Backend):**
   No diretório `/server`: `npm run dev`

4. **Iniciar o Worker (Backend):**
   No diretório `/server`: `npm run worker`
   _(É necessário rodar o worker num terminal separado para o sistema de monitoramento funcionar!)_

5. **Iniciar o Frontend:**
   No diretório `/website`: `npm run dev`

---

## 🗺️ MVPs / Roadmap (Atualizado)

O cronograma e planejamento do projeto baseiam-se nos desenvolvimentos e testes concluídos.

### ✅ MVP 1: Estrutura Base, Usuários e Monitores

- [x] Modelos de Banco de Dados.
- [x] API REST com Express e Prisma.
- [x] Autenticação (JWT, Bcrypt, cookie HttpOnly).
- [x] Layout Base React e Context API.
- [x] Criação e listagem inicial de monitores (API e Frontend).

### 🟡 MVP 2: Monitoramento Contínuo e Detalhes

- [x] Worker para checagem assíncrona.
- [x] Tipos de check: HTTP, HTTPS, TCP.
- [x] Registro de status e latência.
- [x] Remoção de monitores via Frontend.
- [x] Visualização detalhada (Página de Detalhes no Frontend).
- [x] Apresentação do histórico filtrado por período e métricas calculadas na API.

### 🟡 MVP 3: Dashboard e Métricas Avançadas

- [x] Cálculo real de Uptime % e Latência Média por período no backend (`24h`, `7d`, `30d`).
- [ ] Integração do Recharts para gráficos de tempo de resposta.
- [ ] Paginação do Histórico.

### ⬜ MVP 4: Incidentes e Notificações

- [ ] Criação do Modelo `Incident` (Downtime reportado).
- [ ] Fechamento de Incidentes automáticos no retorno do serviço.
- [ ] Integração com webhooks (Discord/Slack).

---

## 🚫 Limitações atuais

- O worker aguarda 5 segundos após concluir um ciclo de checagem antes de iniciar o próximo; o intervalo ainda não é configurável por monitor.
- A funcionalidade de edição de monitores ainda não foi implementada na API nem na interface.
- Embora existam timeouts configurados internamente no backend, ainda não é possível personalizá-los via UI.
