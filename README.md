# Personal Expenses API

## Descrição

API REST para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas.

**Tecnologias utilizadas:**
- Node.js
- Express.js
- Persistência em arquivo JSON

## Como executar

```bash
npm install
npm start
```

Servidor rodando em: `http://localhost:3000`

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /expenses | Lista todas as despesas |
| GET | /expenses/:id | Busca despesa por ID |
| POST | /expenses | Cria uma nova despesa |
| PUT | /expenses/:id | Atualiza uma despesa |
| DELETE | /expenses/:id | Remove uma despesa |
| GET | /expenses/summary/total | Retorna o total gasto |
| GET | /expenses/summary/category | Retorna o total por categoria |

## Exemplo de requisição

**POST /expenses**
```json
{
  "title": "Supermercado",
  "amount": 150.50,
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
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal",
  "createdAt": "2026-03-11T12:00:00.000Z"
}
```

## Regras de negócio

- `title` é obrigatório
- `amount` deve ser maior que zero
- `date` não pode ser no futuro
- `id` é gerado automaticamente
