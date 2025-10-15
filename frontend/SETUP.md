# 🚀 Guia de Setup Rápido

Este guia irá ajudá-lo a configurar e executar o projeto Angular CRUD de Produtos.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)

Verifique as versões instaladas:
```bash
node --version   # Deve ser >= 18.x
npm --version    # Deve ser >= 9.x
```

---

## 📦 Passo 1: Instalar Angular CLI

O Angular CLI facilita o desenvolvimento. Instale globalmente:

```bash
npm install -g @angular/cli@20
```

Verifique a instalação:
```bash
ng version
```

---

## 📥 Passo 2: Instalar Dependências

No diretório do projeto, execute:

```bash
npm install
```

Este comando irá:
- Instalar todas as dependências do `package.json`
- Baixar Angular 20, Angular Material, RxJS, etc.
- Configurar o ambiente de desenvolvimento

**Tempo estimado**: 2-5 minutos (dependendo da conexão)

---

## 🔌 Passo 3: Configurar Backend API

Antes de executar o projeto, configure a URL da sua API REST.

### Configuração por Ambiente

O projeto utiliza arquivos de configuração de ambiente. Edite conforme necessário:

**Para Desenvolvimento** - Edite: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // URL da sua API local
  enableDebugMode: true,
  apiTimeout: 30000,
  environmentName: 'development'
};
```

**Para Produção** - Edite: `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.seudominio.com/api',  // URL da sua API em produção
  enableDebugMode: false,
  apiTimeout: 30000,
  environmentName: 'production'
};
```

**Nota**: O Angular substitui automaticamente o arquivo correto durante o build:
- `ng serve` → usa `environment.ts` (desenvolvimento)
- `ng build --configuration=production` → usa `environment.prod.ts` (produção)

### Endpoints Esperados

Certifique-se de que seu backend expõe os seguintes endpoints:

| Método | Endpoint             | Descrição              |
|--------|----------------------|------------------------|
| GET    | `/api/products`      | Lista todos os produtos|
| GET    | `/api/products/:id`  | Busca produto por ID   |
| POST   | `/api/products`      | Cria novo produto      |
| PUT    | `/api/products/:id`  | Atualiza produto       |
| DELETE | `/api/products/:id`  | Remove produto         |

### Exemplo de Resposta do Backend

```json
{
  "id": 1,
  "name": "Notebook",
  "description": "Notebook Dell Inspiron 15",
  "price": 3500.00,
  "stock": 10,
  "category": "Eletrônicos"
}
```

---

## 🏃 Passo 4: Executar o Projeto

Execute o servidor de desenvolvimento:

```bash
npm start
```

Ou usando o Angular CLI diretamente:
```bash
ng serve
```

O projeto será compilado e estará disponível em:
```
http://localhost:4200
```

**Nota**: A primeira compilação pode levar alguns minutos.

---

## 🌐 Passo 5: Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:4200
```

Você verá a interface do CRUD de Produtos com:
- Toolbar azul com o título "CRUD de Produtos"
- Botão flutuante "+" para adicionar produtos
- Tabela de produtos (vazia inicialmente se não houver dados na API)

---

## 🧪 Testando a Aplicação

### Criar um Produto
1. Clique no botão **+** (flutuante no canto inferior direito)
2. Preencha o formulário:
   - Nome: Notebook
   - Descrição: Notebook Dell Inspiron
   - Categoria: Eletrônicos
   - Preço: 3500
   - Estoque: 10
3. Clique em **Criar**
4. Você verá um snackbar de sucesso e será redirecionado para a lista

### Editar um Produto
1. Na lista, clique no ícone de **edição** (lápis) do produto
2. Altere os dados desejados
3. Clique em **Atualizar**

### Excluir um Produto
1. Na lista, clique no ícone de **exclusão** (lixeira)
2. Confirme a exclusão no diálogo que aparece
3. O produto será removido da lista

---

## 🛠️ Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Build com watch mode (recompila ao salvar)
npm run watch

# Executar testes (quando implementados)
npm test

# Verificar versão do Angular
ng version

# Gerar novo componente
ng generate component nome-componente

# Gerar novo serviço
ng generate service nome-servico
```

---

## 🔧 Troubleshooting

### Problema: Porta 4200 já está em uso

**Solução**: Execute em outra porta
```bash
ng serve --port 4300
```

### Problema: Erro "Cannot find module '@angular/core'"

**Solução**: Reinstale as dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: Erros de CORS ao acessar API

**Solução**: Configure o proxy do Angular

Crie o arquivo `proxy.conf.json` na raiz:
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

Edite `angular.json` e adicione:
```json
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}
```

Execute:
```bash
ng serve
```

Agora mantenha `apiUrl: '/api'` no `environment.ts`

---

## 📚 Próximos Passos

Após o setup completo:

1. ✅ Leia o `README.md` para entender a arquitetura
2. ✅ Leia o `instructions.md` para detalhes técnicos
3. ✅ Explore o código fonte começando por:
   - `src/app/app.component.ts` (componente raiz)
   - `src/app/app.routes.ts` (rotas)
   - `src/app/features/products/products.service.ts` (lógica de negócio)

---

## 💡 Dicas

- Use **Chrome DevTools** para debugar (F12)
- Instale a extensão **Angular DevTools** do Chrome para inspecionar componentes
- Use **Redux DevTools** se adicionar NgRx no futuro
- Configure o **Angular Language Service** no seu editor (VS Code)

---

## 🎯 Estrutura de Arquivos Importantes

```
src/
├── app/
│   ├── app.component.ts        ← Comece aqui (componente raiz)
│   ├── app.routes.ts           ← Configuração de rotas
│   ├── app.config.ts           ← Configuração global
│   ├── core/
│   │   └── services/
│   │       └── api.service.ts  ← Serviço HTTP (usa environment)
│   └── features/
│       └── products/
│           ├── products.service.ts      ← Lógica de negócio
│           ├── products-list/           ← Listagem
│           └── product-form/            ← Formulário
└── environments/
    ├── environment.ts          ← Configure URL da API aqui (DEV)
    └── environment.prod.ts     ← Configure URL da API aqui (PROD)
```

---

**Pronto! Seu ambiente está configurado. Bom desenvolvimento! 🚀**

Se tiver dúvidas, consulte:
- `README.md` - Documentação geral
- `instructions.md` - Detalhes técnicos e arquitetura
- https://angular.dev - Documentação oficial do Angular

