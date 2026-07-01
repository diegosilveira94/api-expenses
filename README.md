# Personal Expenses API

## Descrição

API REST para controle de despesas pessoais, com autenticação por JWT. Cada usuário gerencia suas próprias categorias e despesas, com filtros e um dashboard de estatísticas. Segue o padrão MVC (Models, Views, Controllers).

**Tecnologias utilizadas:**

- Node.js + Express.js
- PostgreSQL (via Docker)
- Sequelize (ORM) + Sequelize CLI (migrations e seeders)
- JWT (autenticação) + bcrypt (hash de senha)
- Swagger (documentação)
- dotenv (variáveis de ambiente)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose

## Configuração do `.env`

Crie um `.env` na raiz com base no `.env.example`:

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgres://root:123456@localhost:5432/expenses
PORT=3000

# docker-compose
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_DB=expenses

# JWT (opcional — há defaults para desenvolvimento)
JWT_SECRET=troque-esta-chave
JWT_EXPIRES_IN=1d
```

## Como executar

1. Suba o banco PostgreSQL:

```bash
docker compose up -d
```

2. Instale as dependências:

```bash
npm install
```

3. Rode as migrations (cria as tabelas) e, opcionalmente, o seeder (dados de exemplo):

```bash
npm run db:migrate
npm run db:seed
```

4. Inicie a API:

```bash
npm start
```

Servidor em `http://localhost:3000`. Documentação Swagger em `http://localhost:3000/api/docs`.

**Usuário de exemplo (do seeder):** `demo@demo.com` / `123456`

Scripts úteis:

```bash
npm run db:migrate        # aplica as migrations
npm run db:seed           # popula dados de exemplo
npm run db:migrate:undo   # reverte todas as migrations
```

## Estrutura do projeto

```
src/
├── app.js                  # Entry point (Express + rotas + Swagger + error handler)
├── config/
│   ├── database.js         # Conexão Sequelize
│   ├── auth.js             # Config do JWT
│   └── swagger.js          # Documento OpenAPI
├── controllers/            # Regras de negócio
├── views/                  # Camada HTTP (req/res)
├── models/                 # Models Sequelize + associations
├── routes/                 # Definição das rotas
├── middlewares/
│   ├── authMiddleware.js   # Validação do JWT
│   └── errorHandler.js     # Tratamento global de erros
└── database/
    ├── config/config.cjs   # Config do Sequelize CLI
    ├── migrations/         # Migrations (.cjs)
    └── seeders/            # Seeders (.cjs)
```

## Autenticação

1. Cadastre um usuário em `POST /api/users`.
2. Faça login em `POST /api/auth/login` para receber um token JWT.
3. Envie o token nas rotas protegidas:

```
Authorization: Bearer <token>
```

A senha é armazenada com **bcrypt** (hash), nunca em texto puro.

## Rotas da API

Base: `http://localhost:3000/api`

### Auth (públicas)

| Método | Rota        | Descrição                 |
| ------ | ----------- | ------------------------- |
| POST   | /users      | Cadastro de usuário       |
| POST   | /auth/login | Login (retorna token JWT) |

### Usuários (protegidas)

| Método | Rota       | Descrição            |
| ------ | ---------- | -------------------- |
| GET    | /users     | Lista usuários       |
| GET    | /users/:id | Busca usuário por ID |
| PUT    | /users/:id | Atualiza usuário     |
| DELETE | /users/:id | Remove usuário       |

### Categorias (protegidas)

| Método | Rota            | Descrição              |
| ------ | --------------- | ---------------------- |
| GET    | /categories     | Lista categorias       |
| GET    | /categories/:id | Busca categoria por ID |
| POST   | /categories     | Cria categoria         |
| PATCH  | /categories/:id | Atualiza categoria     |
| DELETE | /categories/:id | Remove categoria       |

### Despesas (protegidas, escopadas ao usuário logado)

| Método | Rota          | Descrição                    |
| ------ | ------------- | ---------------------------- |
| GET    | /expenses     | Lista as despesas do usuário |
| GET    | /expenses/:id | Busca despesa por ID         |
| POST   | /expenses     | Cria despesa                 |
| PUT    | /expenses/:id | Atualiza completamente       |
| PATCH  | /expenses/:id | Atualiza parcialmente        |
| DELETE | /expenses/:id | Remove despesa               |

O `userId` é obtido do token — não é enviado no corpo. Cada usuário só acessa as próprias despesas.

### Dashboard (protegidas, por usuário)

| Método | Rota                            | Resposta                                  |
| ------ | ------------------------------- | ----------------------------------------- |
| GET    | /dashboard/total-expenses       | `{ "total": 3500.50 }`                    |
| GET    | /dashboard/expenses-count       | `{ "count": 45 }`                         |
| GET    | /dashboard/expenses-by-category | `[{ "category": "Food", "total": 1200 }]` |

## Filtros de despesas

`GET /api/expenses` aceita filtros combináveis por query string:

| Parâmetro  | Descrição                 | Exemplo                 |
| ---------- | ------------------------- | ----------------------- |
| status     | `PENDENTE` ou `PAGA`      | `?status=PAGA`          |
| categoryId | ID da categoria           | `?categoryId=<uuid>`    |
| minAmount  | Valor mínimo              | `?minAmount=10`         |
| maxAmount  | Valor máximo              | `?maxAmount=100`        |
| startDate  | Data inicial (YYYY-MM-DD) | `?startDate=2026-06-01` |
| endDate    | Data final (YYYY-MM-DD)   | `?endDate=2026-06-30`   |

Exemplo: `GET /api/expenses?status=PAGA&minAmount=50&startDate=2026-06-01`

## Exemplos de requisição

**POST /api/auth/login**

```json
{ "email": "demo@demo.com", "password": "123456" }
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiI...",
  "user": {
    "id": "d1bb8c56-217b-4a98-8df2-213c6d4007b0",
    "email": "demo@demo.com",
    "name": "Demo"
  }
}
```

**POST /api/expenses** (com header `Authorization: Bearer <token>`)

```json
{
  "description": "Supermercado",
  "amount": 150.5,
  "date": "2026-06-10",
  "status": "PAGA",
  "categoryId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

## Entidades

- **Usuário**: id, name, email (único), password (hash), createdAt, updatedAt
- **Categoria**: id (UUID), name, description
- **Despesa**: id (UUID), description, amount, date, status (`PENDENTE` | `PAGA`), categoryId, userId

## Regras de negócio

- Email válido e único; senha com no mínimo 6 caracteres (armazenada com bcrypt).
- Categoria exige `name`.
- Despesa: `amount` não pode ser negativo; `status` só aceita `PENDENTE` ou `PAGA` (padrão `PENDENTE`).
- Despesas e dashboard são sempre escopados ao usuário autenticado.

## Documentação e testes

- **Swagger:** `http://localhost:3000/api/docs`
- **Postman:** importe `docs/personalExpenses.postman_collection.json` (faça o login primeiro — o token é salvo automaticamente).

## Referências

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)
- [Docker](https://docs.docker.com/)
