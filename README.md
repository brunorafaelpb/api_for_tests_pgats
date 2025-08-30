# API de Transferências

Esta API permite realizar registro, login, consulta de usuários e transferências de valores entre usuários. O banco de dados é em memória, ideal para testes e automação.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Executando a API

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /register`: Registra um novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `favorecidos` (array de usernames).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários cadastrados.
- `POST /transfer`: Realiza uma transferência. Campos obrigatórios: `from`, `to`, `amount`.
- `GET /transfers`: Lista todas as transferências realizadas.
- `GET /api-docs`: Documentação Swagger interativa.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.

## Testes

Para testar a API com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

## Documentação Swagger

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger.
