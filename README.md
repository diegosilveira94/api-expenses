# Personal Expenses API

## Descrição

API REST para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas.

**Tecnologias utilizadas:**

- Node.js
- Express.js
- PostgreSQL (via Docker)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose

## Configuração do `.env`

Antes de executar o projeto, crie um arquivo `.env` na raiz com base no `.env.example`:

```bash
cp .env.example .env
```

Variáveis necessárias:

```env
DATABASE_URL=postgres://root:123456@localhost:5432/expenses
PORT=3000

# docker-compose
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_DB=expenses
```

> O `docker-compose.yml` e a aplicação leem essas variáveis. Sem elas, o banco não sobe e a API não conecta.

## Como executar

1. Suba o banco PostgreSQL com Docker:

```bash
docker compose up -d
```

2. Instale as dependências e inicie a API:

```bash
npm install
npm run start
```

Servidor rodando em: `http://localhost:3000`

Para parar o banco:

```bash
docker compose down
```

## Rotas da API

| Método | Rota             | Descrição                          |
| ------ | ---------------- | ---------------------------------- |
| GET    | api/expenses     | Lista todas as despesas            |
| GET    | api/expenses/:id | Busca despesa por ID               |
| POST   | api/expenses     | Cria uma nova despesa              |
| PUT    | api/expenses/:id | Atualiza completamente uma despesa |
| PATCH  | api/expenses/:id | Atualiza parcialmente uma despesa  |
| DELETE | api/expenses/:id | Remove uma despesa                 |

## Exemplo de requisição

**POST api/expenses**

```json
{
  "title": "Supermercado",
  "amount": 150.5,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal"
}
```

**Resposta:**

```json
{
  "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "title": "Supermercado",
  "amount": 150.5,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal",
  "createdAt": "2026-03-11T12:00:00.000Z"
}
```

## Regras de negócio

- `title` é obrigatório
- `id` é gerado automaticamente

## Referências

- [Express.js Documentation](https://expressjs.com/)
- [Rest API Tutorial](https://www.restapitutorial.com/)
- [MDN](https://developer.mozilla.org)
