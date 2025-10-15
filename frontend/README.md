# CRUD de Produtos - Angular 20

Sistema completo de cadastro de produtos desenvolvido com **Angular 20.x**, seguindo as práticas modernas da [documentação oficial](https://angular.dev).

## 🚀 Tecnologias Utilizadas

- **Angular 20.x** - Framework principal
- **Angular Material** - Componentes UI (tema Indigo/Pink)
- **RxJS 7+** - Programação reativa
- **TypeScript 5.7** - Linguagem tipada
- **Standalone Components** - Arquitetura moderna do Angular
- **Reactive Forms** - Formulários reativos com validação

## 📋 Funcionalidades

✅ **Listagem de produtos** com tabela responsiva e paginação  
✅ **Criação de produtos** via formulário reativo  
✅ **Edição de produtos** com carregamento de dados  
✅ **Exclusão de produtos** com diálogo de confirmação  
✅ **Feedback visual** com snackbars  
✅ **Validação de formulários** em tempo real  
✅ **Estado reativo** usando BehaviorSubject  
✅ **Lazy loading** de componentes  
✅ **Design responsivo** para mobile e desktop

## 🏗️ Arquitetura

O projeto segue a convenção moderna do Angular com **standalone components** e **feature folders**:

```
src/app/
├── core/                          # Serviços principais
│   └── services/
│       └── api.service.ts         # Serviço HTTP base
│
├── shared/                        # Recursos compartilhados
│   ├── models/
│   │   └── product.model.ts       # Interface Product
│   └── components/
│       └── confirm-dialog/        # Diálogo de confirmação
│
├── features/                      # Features da aplicação
│   └── products/
│       ├── products-list/         # Listagem de produtos
│       ├── product-form/          # Formulário (criar/editar)
│       └── products.service.ts    # Serviço de produtos
│
├── environments/                  # Configurações de ambiente
│   ├── environment.ts             # Desenvolvimento
│   └── environment.prod.ts        # Produção
│
├── app.component.ts               # Componente raiz
├── app.routes.ts                  # Configuração de rotas
└── app.config.ts                  # Configuração global
```

### Padrões Arquiteturais

- **Standalone Components**: Todos os componentes são standalone
- **Injeção de Dependências**: Uso de `inject()` moderno
- **Estado Reativo**: BehaviorSubject para gerenciar lista de produtos
- **Separation of Concerns**: Lógica separada em serviços
- **Smart/Dumb Components**: Componentes com responsabilidades bem definidas

## 🔌 Integração com Backend

O sistema se comunica com uma API REST através dos seguintes endpoints:

```
GET    /api/products          # Lista todos os produtos
GET    /api/products/:id      # Busca produto por ID
POST   /api/products          # Cria novo produto
PUT    /api/products/:id      # Atualiza produto
DELETE /api/products/:id      # Remove produto
```

**Configuração da URL base**: Edite os arquivos de environment:
- **Desenvolvimento**: `src/environments/environment.ts`
- **Produção**: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',  // URL da sua API
  // ...
};
```

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ e npm
- Angular CLI 20.x

### 1. Instalar o Angular CLI

```bash
npm install -g @angular/cli@20
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar a API

Edite o arquivo de environment correspondente para configurar a URL base da sua API:

**Para desenvolvimento** - `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // Altere para a URL da sua API local
  // ...
};
```

**Para produção** - `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.seudominio.com/api',  // URL da sua API em produção
  // ...
};
```

### 4. Executar o projeto

```bash
npm start
# ou
ng serve
```

Acesse: `http://localhost:4200`

## 🛠️ Scripts Disponíveis

```bash
npm start          # Inicia servidor de desenvolvimento
npm run build      # Build de produção
npm run watch      # Build com watch mode
npm test           # Executa testes unitários
```

## 📱 Rotas da Aplicação

| Rota                    | Descrição              |
|-------------------------|------------------------|
| `/products`             | Lista de produtos      |
| `/products/new`         | Criar novo produto     |
| `/products/:id/edit`    | Editar produto         |

## 🎨 Personalização do Tema

O projeto usa o tema **Indigo/Pink** do Angular Material. Para alterar:

1. Edite `angular.json`:

```json
"styles": [
  "@angular/material/prebuilt-themes/purple-green.css", // Outro tema
  "src/styles.scss"
]
```

Temas disponíveis:
- `indigo-pink.css` (padrão)
- `deeppurple-amber.css`
- `pink-bluegrey.css`
- `purple-green.css`

## 🧪 Validações de Formulário

O formulário de produtos possui as seguintes validações:

| Campo       | Validação                    |
|-------------|------------------------------|
| Nome        | Obrigatório, mín. 3 chars    |
| Descrição   | Opcional, máx. 500 chars     |
| Preço       | Obrigatório, maior que 0     |
| Estoque     | Obrigatório, não-negativo    |
| Categoria   | Opcional                     |

## 📊 Modelo de Dados

```typescript
interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🔄 Fluxo de Dados Reativo

O `ProductsService` mantém o estado da aplicação usando `BehaviorSubject`:

```typescript
// Serviço mantém o estado
private productsSubject = new BehaviorSubject<Product[]>([]);
public products$ = this.productsSubject.asObservable();

// Componentes se inscrevem usando async pipe
products$ = this.productsService.products$;
```

**Benefícios**:
- Único ponto de verdade
- Atualizações automáticas em todos os componentes
- Gerenciamento simplificado de estado

## 🎯 Boas Práticas Implementadas

✅ **Type Safety**: TypeScript em strict mode  
✅ **Immutability**: Operações que não mutam arrays  
✅ **Error Handling**: Tratamento centralizado de erros  
✅ **Accessibility**: Labels e ARIA attributes  
✅ **Responsiveness**: Mobile-first design  
✅ **Code Organization**: Estrutura modular e escalável  
✅ **Clean Code**: Código limpo e bem comentado  
✅ **Reactive Programming**: Uso extensivo de RxJS  

## 📚 Recursos e Referências

- [Documentação Oficial do Angular](https://angular.dev)
- [Angular Material Components](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Estrutura de Commits

Este projeto segue a convenção de commits semânticos:

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: alterações em documentação
style: formatação, ponto e vírgula, etc
refactor: refatoração de código
test: adiciona ou modifica testes
chore: mudanças em build, configuração, etc
```

## 📄 Licença

Este projeto é um exemplo educacional e pode ser usado livremente.

---

**Desenvolvido com Angular 20 seguindo as diretrizes oficiais de [angular.dev](https://angular.dev)** ✨

