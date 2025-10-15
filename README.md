## ACT Digital - Entrevista

Sistema de gerenciamento de produtos com CRUD completo.

### Tecnologias

**Backend:**
- .NET 8 Web API
- Entity Framework Core (In-Memory Database)
- Swagger/OpenAPI

**Frontend:**
- Angular 20
- Angular Material
- RxJS

### Formas de Execução

Este projeto pode ser executado de **duas formas independentes**:

1. **Com Docker** (recomendado) - não requer instalação de .NET ou Node.js localmente
2. **Sem Docker** (desenvolvimento local) - requer .NET 8 SDK e Node.js instalados

---

## Opção 1: Execução com Docker

### Requisitos

- Docker 20.10+
- Docker Compose 2.0+

> **Nota:** Com Docker, você **não precisa** ter .NET SDK ou Node.js instalados localmente. Tudo roda dentro dos containers com hot reload configurado para desenvolvimento.

### Início rápido

Com Docker Compose:
```bash
docker-compose up -d
```

Ou com script auxiliar:
```bash
# Vantagens de utilizar o script auxiliar:
# - Pergunta se deseja reconstruir as imagens Docker
# - Aguarda automaticamente o backend ficar disponível antes de finalizar
# - Apresenta mensagens informativas, facilitando o acompanhamento do processo
# - Realiza verificações úteis, como o status do Docker

./scripts/quick-start.sh
```

---

## Opção 2: Execução Local (sem Docker)

### Requisitos

- .NET 8 SDK
- Node.js 22+ (mínimo Node.js 18+)
- npm 9+

> **Nota:** Certifique-se de ter as versões corretas instaladas antes de prosseguir.

### Executar Backend

```bash
cd backend/ProductAPI
dotnet run
```

### Executar Frontend

```bash
cd frontend
npm install
npm start
```

---

### Acessos

- Frontend: http://localhost:4200
- Backend: http://localhost:5215
- Swagger: http://localhost:5215/swagger

### Funcionalidades

- Listagem de produtos
- Cadastro de novos produtos
- Edição de produtos existentes
- Exclusão de produtos
- Validação de formulários