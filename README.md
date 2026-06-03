# 🌟 PeopleCore

> Sistema de RH desenvolvido para simplificar a gestão de pessoas dentro das empresas.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
</p>

---

## 📋 Sobre o Projeto

O **PeopleCore** é um sistema de RH pensado para centralizar informações, organizar processos e tornar o dia a dia do RH mais eficiente — reduzindo burocracias e facilitando a tomada de decisão.

Desenvolvido como projeto integrador do **Desafio 3 Backend** da **Generation Brasil** pelo Grupo 3.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js | Runtime JavaScript |
| NestJS | Framework backend |
| MySQL | Banco de dados relacional |
| TypeORM | ORM para integração com o banco |
| JWT | Autenticação e autorização |
| Swagger | Documentação da API |
| Insomnia | Testes de endpoints |

---

## 🗂️ Estrutura de Módulos

```
src/
├── autenticacao/      # Autenticação JWT (login, guard, token)
├── categoria/         # Gerenciamento de categorias/departamentos
├── funcionario/       # CRUD de funcionários
├── usuario/           # Gerenciamento de usuários
├── data/services/     # Configurações de banco e serviços globais
├── app.module.ts
├── app.controller.ts
└── main.ts
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL](https://www.mysql.com/) instalado e rodando
- [Git](https://git-scm.com/)

### 1. Instale o NestJS CLI (caso não tenha)

```bash
npm install -g @nestjs/cli
```

### 2. Clone o repositório

```bash
git clone https://github.com/seu-usuario/peoplecore.git
cd peoplecore
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=peoplecore
JWT_SECRET=sua_chave_secreta
```

### 5. Inicie o servidor em modo desenvolvimento

```bash
npm run start:dev
```

O servidor estará disponível em: `http://localhost:3000`

A documentação Swagger estará em: `http://localhost:3000/swagger`

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)**. Para acessar os endpoints protegidos:

1. Faça login via `POST /auth/login` com suas credenciais
2. Copie o token retornado
3. Envie o token no header das requisições:

```
Authorization: Bearer {seu_token}
```

---

## 🧩 Principais Recursos

- **Usuários** — Cadastro e autenticação de usuários do sistema
- **Funcionários** — CRUD completo de colaboradores
- **Categorias** — Organização por categorias/departamentos com relacionamentos
- **Autenticação JWT** — Segurança nas rotas da API

---

## 👥 Equipe

| Nome | Papel |
|---|---|
| Jhonatan Miranda | PMO |
| Bianca Nascimento | Desenvolvedora |
| Kefilwe Lourenço | Desenvolvedor |
| Leticia Fonseca | Desenvolvedora |
| Kauã Vinícius | Desenvolvedor |
| Tais Duarte | Desenvolvedora |
| Victor Ferreira | Tester |

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no programa **Generation Brasil**.
