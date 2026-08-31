# 📡 Uptime Dashboard

Plataforma Full Stack para monitoramento de disponibilidade, latência e histórico de serviços HTTP.

O projeto será desenvolvido em dupla como ambiente de aprendizado prático de desenvolvimento **Frontend + Backend**, arquitetura, banco de dados, trabalho colaborativo com Git/GitHub e evolução gradual até uma aplicação pronta para produção.

---

## 🎯 Objetivo

Construir uma plataforma capaz de:

```text
Cadastrar um monitor
        ↓
Verificar uma URL
        ↓
Medir resposta e latência
        ↓
Salvar o resultado
        ↓
Exibir o status na dashboard
```

O projeto será desenvolvido por etapas.

A prioridade é:

> construir corretamente → entender → testar → revisar → evoluir.

Não queremos implementar toda a plataforma de uma vez.

---

# 🚧 Fase atual — MVP 1

Nesta primeira fase, o sistema deve permitir:

- criar um monitor;
- listar monitores;
- realizar uma checagem HTTP;
- identificar se o serviço está UP ou DOWN;
- medir a latência;
- registrar o status HTTP;
- salvar as checagens no PostgreSQL;
- visualizar o estado atual no frontend;
- consultar o histórico básico de checagens.

### Fluxo esperado

```text
Usuário
   ↓
React
   ↓
REST API
   ↓
Express
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL
```

Para executar uma checagem:

```text
Monitor
   ↓
HTTP Request
   ↓
URL monitorada
   ↓
status + latência
   ↓
Check
   ↓
PostgreSQL
```

---

# 🧱 Stack

## Frontend

### React + Vite

Responsável pela dashboard e interação com o usuário.

**Motivos:**

- componentização;
- ecossistema moderno;
- ótimo para aplicações SPA;
- desenvolvimento rápido;
- ambos poderão praticar React.

### React Router

Responsável pela navegação entre páginas.

### CSS Modules

Utilizado inicialmente para estilização.

Permite:

- CSS tradicional;
- escopo por componente;
- menor risco de conflito entre estilos;
- controle da interface sem introduzir outra abstração agora.

### Fetch API

Inicialmente utilizada para comunicação com o backend.

### Recharts

Será introduzido quando começarmos a exibir:

- latência;
- histórico;
- uptime;
- métricas.

### TanStack Query

Será introduzido quando a quantidade de dados remotos justificar gerenciamento de:

- cache;
- loading;
- refetch;
- estados de erro;
- sincronização com a API.

---

# ⚙️ Backend

## Node.js

Runtime JavaScript utilizado no servidor.

## Express

Responsável pela API REST.

Arquitetura inicial:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL
```

## Zod

Responsável pela validação de entrada.

Exemplos:

```text
URL válida?
nome obrigatório?
intervalo válido?
timeout válido?
```

Regras de negócio continuam no Service.

Exemplo:

```text
o usuário pode criar esse monitor?
esse recurso existe?
essa operação pode acontecer?
```

## Prisma ORM

Responsável pela comunicação da aplicação com o banco.

Usaremos:

- models;
- migrations;
- relations;
- queries;
- transactions quando necessário.

## PostgreSQL

Banco relacional principal da aplicação.

---

# 🗄️ Modelagem inicial

O MVP começa com duas entidades principais:

```text
Monitor 1 ───────── N Check
```

## Monitor

Representa um serviço que deve ser monitorado.

Campos inicialmente previstos:

```text
id
name
url
active
createdAt
updatedAt
```

Campos como `interval` e `timeout` poderão ser adicionados quando o monitoramento automático entrar.

---

## Check

Representa o resultado de uma checagem.

Campos inicialmente previstos:

```text
id
monitorId
status
statusCode
latency
checkedAt
```

Relação:

```text
Check.monitorId
       ↓
Monitor.id
```

Um `Monitor` pode possuir muitas `Checks`.

---

# 📡 Status do monitor

Inicialmente consideraremos:

```text
UP
DOWN
```

Uma checagem deverá registrar informações como:

```json
{
  "status": "UP",
  "statusCode": 200,
  "latency": 132
}
```

ou:

```json
{
  "status": "DOWN",
  "statusCode": 500,
  "latency": 240
}
```

Falhas de conexão e timeout também deverão resultar em uma checagem registrada.

---

# 🔗 API inicial

Endpoints previstos para o MVP:

```http
POST   /monitors
GET    /monitors
GET    /monitors/:id
PATCH  /monitors/:id
DELETE /monitors/:id
```

Checagens:

```http
POST /monitors/:id/check
GET  /monitors/:id/checks
```

O endpoint:

```http
POST /monitors/:id/check
```

executará inicialmente uma checagem manual.

Automação periódica virá depois.

---

# 🖥️ Frontend inicial

## Dashboard

Deve exibir:

```text
Nome
URL
Status
Latência
Última checagem
```

Exemplo:

```text
┌──────────────────────────────────────────────┐
│ Odyssey API                                 │
│ https://api.exemplo.com                     │
│                                             │
│ ● UP       132 ms       há 20 segundos      │
└──────────────────────────────────────────────┘
```

## Criar monitor

Formulário inicial:

```text
Nome
URL
```

## Detalhes do monitor

Exibir:

```text
status atual
última checagem
latência
status HTTP
histórico
```

Gráficos serão adicionados posteriormente.

---

# 🗂️ Estrutura inicial

Uma possível estrutura:

```text
uptime-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── schemas/
│   │   ├── libs/
│   │   └── server.js
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── package.json
│
└── README.md
```

A estrutura poderá evoluir conforme aparecer necessidade real.

---

# 👥 Desenvolvimento em dupla

Os dois desenvolvedores atuarão como **Full Stack**.

Não haverá separação permanente:

```text
Pedro → Backend
Outro dev → Frontend
```

Em vez disso, trabalharemos por feature.

Exemplo:

```text
Feature: Criar Monitor

Dev A
→ Backend

Dev B
→ Frontend
```

Na próxima feature:

```text
Dev A
→ Frontend

Dev B
→ Backend
```

Assim ambos praticam toda a stack.

---

# 🔄 Fluxo de desenvolvimento

Cada feature deverá seguir:

```text
Definir requisito
      ↓
Definir contrato da API
      ↓
Criar branch
      ↓
Implementar
      ↓
Testar
      ↓
Push
      ↓
Pull Request
      ↓
Code Review pelo outro dev
      ↓
Correções
      ↓
Merge
```

---

# 🌿 Git

Branch principal:

```text
main
```

Branches de feature:

```text
feature/create-monitor
feature/list-monitors
feature/manual-check
feature/check-history
```

Exemplos de commits:

```text
feat: adiciona criação de monitores
feat: implementa checagem HTTP manual
fix: corrige cálculo de latência
refactor: separa lógica de checks em service
docs: atualiza endpoints de monitoramento
```

---

# 👀 Code Review

Quem não implementou a feature deverá revisar.

O reviewer deve conseguir responder:

```text
Entendi o fluxo?
A responsabilidade está na camada correta?
Existe código duplicado?
Os erros estão sendo tratados?
O input é validado?
A feature pode quebrar outra coisa?
Eu conseguiria modificar esse código depois?
```

A regra é:

> Se somente quem escreveu entende o código, a feature ainda não terminou.

---

# ✅ Definition of Done

Uma feature só é considerada concluída quando:

```text
[ ] funciona
[ ] foi testada
[ ] erros relevantes foram tratados
[ ] código está organizado
[ ] não existem credenciais no repositório
[ ] outro desenvolvedor revisou
[ ] PR foi aprovado
[ ] documentação foi atualizada quando necessário
[ ] foi mergeada sem quebrar a main
```

---

# 🧠 Regra de aprendizado

O projeto não deve ser produzido integralmente por IA.

Fluxo recomendado quando alguém travar:

```text
1. tentar resolver sozinho
        ↓
2. consultar documentação
        ↓
3. pedir uma pista
        ↓
4. pedir explicação conceitual
        ↓
5. consultar exemplo isolado
        ↓
6. somente então analisar uma solução completa
```

Quem implementou uma parte deve conseguir explicar:

```text
o que ela faz
por que foi feita assim
como os dados percorrem o sistema
o que acontece quando falha
qual camada possui cada responsabilidade
```

---

# 📋 Requisitos do MVP 1

## Backend

```text
[ ] Model Monitor
[ ] Model Check
[ ] Relação Monitor 1:N Check
[ ] Migrations
[ ] CRUD de Monitor
[ ] Validação com Zod
[ ] Tratamento centralizado de erros
[ ] Check HTTP manual
[ ] Captura de status HTTP
[ ] Medição de latência
[ ] Tratamento de timeout/falha
[ ] Persistência de Checks
[ ] Histórico por Monitor
```

## Frontend

```text
[ ] Layout base
[ ] Dashboard
[ ] Lista de monitores
[ ] Criar monitor
[ ] Estado UP/DOWN
[ ] Exibir latência
[ ] Exibir última checagem
[ ] Executar check manual
[ ] Página de detalhes
[ ] Histórico básico
[ ] Loading
[ ] Erros da API
```

## Projeto

```text
[ ] README
[ ] .gitignore
[ ] .env.example
[ ] branches
[ ] Pull Requests
[ ] code review
[ ] commits organizados
```

---

# 🚫 Fora do escopo do MVP 1

Ainda NÃO implementar:

```text
autenticação
JWT
OAuth
Redis
BullMQ
RabbitMQ
Kafka
microserviços
WebSockets
Docker
CI/CD
email
Discord alerts
status page pública
billing
planos
times
multi-tenancy
```

Esses recursos entram quando houver necessidade.

A prioridade agora é:

```text
Monitor
   ↓
Check
   ↓
Persistência
   ↓
Dashboard
```

---

# 🗺️ Roadmap do projeto

## MVP 1 — Monitoramento básico

```text
Monitor
→ check manual
→ persistência
→ dashboard
```

## MVP 2 — Monitoramento automático

```text
intervalos
→ scheduler
→ timeout
→ checks automáticos
```

## MVP 3 — Métricas

```text
histórico
→ uptime %
→ latência média
→ gráficos
```

## MVP 4 — Usuários

```text
User
→ cadastro
→ login
→ autenticação
→ autorização
→ User 1:N Monitor
```

## MVP 5 — Incidentes

```text
DOWN
→ abre incidente

UP novamente
→ fecha incidente

→ duração
→ histórico
```

## MVP 6 — Notificações

```text
DOWN
→ webhook
→ Discord
→ email
```

## MVP 7 — Escalabilidade

Quando necessário:

```text
Redis
→ BullMQ
→ workers
→ retries
→ backoff
→ concorrência
```

## MVP 8 — Produção

```text
Docker
→ CI/CD
→ deploy
→ HTTPS
→ logs
→ observabilidade
```

---

# 🎯 Critério para finalizar esta fase

O MVP 1 estará concluído quando conseguirmos fazer:

```text
Cadastrar Monitor
       ↓
Executar Check
       ↓
Receber resposta HTTP
       ↓
Medir latência
       ↓
Salvar Check
       ↓
Consultar histórico
       ↓
Visualizar tudo no React
```

sem depender de dados mockados.

---

# 📈 Objetivo de aprendizado

Ao finalizar esta fase, ambos devem conseguir explicar e implementar:

- API REST;
- arquitetura Route → Controller → Service;
- React consumindo backend real;
- validação com Zod;
- Prisma;
- PostgreSQL;
- relations 1:N;
- migrations;
- tratamento de erros;
- integração Frontend ↔ Backend;
- requisições HTTP;
- trabalho com Git em equipe;
- Pull Requests;
- code review.

---

## 🚀 Filosofia do projeto

> Não queremos construir tudo rápido.

Queremos construir algo que os dois consigam entender, manter, explicar e evoluir.
