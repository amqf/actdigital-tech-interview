# 📘 Instruções do Projeto - CRUD de Produtos Angular

## 1. Project Overview

Este é um **sistema completo de gerenciamento de produtos (CRUD)** desenvolvido com **Angular 20.x**, seguindo as práticas mais modernas e atualizadas da documentação oficial (https://angular.dev).

### Objetivo Principal
Implementar um sistema funcional de cadastro de produtos com operações completas de **Create, Read, Update e Delete**, integrado com uma API REST backend existente, utilizando Angular Material para interface visual moderna e responsiva.

### Características Principais
- ✅ Arquitetura moderna com **standalone components**
- ✅ Programação reativa com **RxJS 7+**
- ✅ Formulários reativos com validação em tempo real
- ✅ Estado gerenciado com **BehaviorSubject**
- ✅ Interface clean com **Angular Material** (tema Indigo/Pink)
- ✅ Design responsivo para mobile e desktop
- ✅ Lazy loading de componentes para performance otimizada

---

## 2. Core Functionalities

### 2.1 Listagem de Produtos
**Localização**: `src/app/features/products/products-list/`

**Funcionalidades**:
- Exibição de produtos em tabela Material com colunas: ID, Nome, Categoria, Preço, Estoque, Ações
- Paginação integrada (5, 10, 25, 50 itens por página)
- Badge colorido de estoque (verde >10, amarelo >0, vermelho =0)
- Botão FAB (Floating Action Button) para adicionar produto
- Botões de ação: editar e excluir por produto
- Estado vazio com mensagem quando não há produtos
- Loading spinner durante carregamento

**Fluxo**:
1. Componente se inscreve no Observable `products$` do serviço
2. Usa `async pipe` para renderizar automaticamente
3. Todas as operações atualizam o BehaviorSubject, propagando mudanças

### 2.2 Criação de Produtos
**Localização**: `src/app/features/products/product-form/`

**Funcionalidades**:
- Formulário reativo com validações em tempo real
- Campos: Nome*, Descrição, Categoria, Preço*, Estoque*
- Validações:
  - Nome: obrigatório, mínimo 3 caracteres
  - Preço: obrigatório, maior que 0
  - Estoque: obrigatório, não-negativo
  - Descrição: máximo 500 caracteres
- Feedback visual de erros
- Botões: Cancelar e Criar
- Snackbar de confirmação/erro

**Fluxo**:
1. Usuário preenche formulário
2. Validação em tempo real
3. Submit chama `productsService.createProduct()`
4. Serviço atualiza BehaviorSubject
5. Redirecionamento para lista com feedback

### 2.3 Edição de Produtos
**Localização**: `src/app/features/products/product-form/` (mesmo componente)

**Funcionalidades**:
- Reutiliza o componente de formulário
- Carrega dados do produto via ID da rota
- Preenche formulário automaticamente
- Título dinâmico: "Editar Produto"
- Botão de ação: "Atualizar"

**Fluxo**:
1. Componente detecta ID na rota
2. Carrega produto via `productsService.getProductById()`
3. Preenche formulário com `patchValue()`
4. Submit chama `productsService.updateProduct()`
5. Serviço atualiza item no BehaviorSubject

### 2.4 Exclusão de Produtos
**Localização**: Diálogo em `src/app/shared/components/confirm-dialog/`

**Funcionalidades**:
- Diálogo de confirmação antes de excluir
- Mensagem personalizada com nome do produto
- Botões: Cancelar e Excluir (vermelho)
- Snackbar de confirmação/erro

**Fluxo**:
1. Usuário clica em botão de excluir
2. Abre `MatDialog` com `ConfirmDialogComponent`
3. Se confirmado, chama `productsService.deleteProduct()`
4. Serviço remove item do BehaviorSubject
5. Lista atualiza automaticamente

### 2.5 Feedback Visual
- **MatSnackBar**: Mensagens de sucesso e erro
- **MatProgressSpinner**: Loading states
- **Badges coloridos**: Status de estoque
- **Validação de formulário**: Mensagens de erro em tempo real

---

## 3. Docs and Libraries

### Documentação Oficial
- **Angular 20**: https://angular.dev
- **Angular Material**: https://material.angular.io
- **RxJS**: https://rxjs.dev
- **TypeScript**: https://www.typescriptlang.org

### Bibliotecas Principais

#### Angular Core
```json
"@angular/core": "^20.0.0"
"@angular/common": "^20.0.0"
"@angular/router": "^20.0.0"
"@angular/forms": "^20.0.0"
```

#### Angular Material
```json
"@angular/material": "^20.0.0"
"@angular/cdk": "^20.0.0"
"@angular/animations": "^20.0.0"
```

Componentes Material utilizados:
- `MatToolbar` - Cabeçalho
- `MatTable` + `MatPaginator` - Tabela
- `MatCard` - Cards
- `MatFormField` + `MatInput` - Formulários
- `MatButton` - Botões
- `MatIcon` - Ícones
- `MatDialog` - Diálogos
- `MatSnackBar` - Notificações
- `MatProgressSpinner` - Loading
- `MatTooltip` - Tooltips

#### RxJS
```json
"rxjs": "^7.8.1"
```

Operadores utilizados:
- `BehaviorSubject` - Estado reativo
- `Observable` - Streams de dados
- `tap` - Efeitos colaterais
- `catchError` - Tratamento de erros
- `async pipe` - Inscrição automática

---

## 4. Current File Structure

```
web/
├── src/
│   ├── app/
│   │   ├── core/                              # Serviços principais
│   │   │   └── services/
│   │   │       └── api.service.ts             # Serviço HTTP centralizado
│   │   │
│   │   ├── shared/                            # Recursos compartilhados
│   │   │   ├── models/
│   │   │   │   └── product.model.ts           # Interface Product
│   │   │   └── components/
│   │   │       └── confirm-dialog/
│   │   │           └── confirm-dialog.component.ts
│   │   │
│   │   ├── features/                          # Features modulares
│   │   │   └── products/
│   │   │       ├── products-list/
│   │   │       │   ├── products-list.component.ts
│   │   │       │   ├── products-list.component.html
│   │   │       │   └── products-list.component.scss
│   │   │       │
│   │   │       ├── product-form/
│   │   │       │   ├── product-form.component.ts
│   │   │       │   ├── product-form.component.html
│   │   │       │   └── product-form.component.scss
│   │   │       │
│   │   │       └── products.service.ts        # Lógica de negócio
│   │   │
│   │   ├── app.component.ts                   # Componente raiz
│   │   ├── app.routes.ts                      # Configuração de rotas
│   │   └── app.config.ts                      # Configuração global
│   │
│   ├── environments/                          # Configurações de ambiente
│   │   ├── environment.ts                     # Configuração de desenvolvimento
│   │   └── environment.prod.ts                # Configuração de produção
│   │
│   ├── assets/                                # Assets estáticos
│   ├── styles.scss                            # Estilos globais
│   ├── index.html                             # HTML principal
│   └── main.ts                                # Bootstrap da aplicação
│
├── angular.json                               # Configuração do Angular CLI
├── package.json                               # Dependências
├── tsconfig.json                              # Configuração TypeScript
├── tsconfig.app.json                          # Config TS para app
├── README.md                                  # Documentação principal
├── instructions.md                            # Este arquivo
└── .gitignore                                 # Arquivos ignorados pelo git
```

### Detalhamento dos Arquivos Principais

#### Camada Core
- **`api.service.ts`**: Serviço genérico para comunicação HTTP com a API (usa configurações do environment)

#### Camada Shared
- **`product.model.ts`**: Interface TypeScript do modelo Product
- **`confirm-dialog.component.ts`**: Componente reutilizável de diálogo

#### Camada Features
- **`products.service.ts`**: Gerencia estado e operações CRUD de produtos
- **`products-list.component.*`**: Exibe lista e gerencia ações
- **`product-form.component.*`**: Formulário para criar/editar

#### Configuração
- **`app.routes.ts`**: Define rotas da aplicação
- **`app.config.ts`**: Providers globais (HttpClient, Router, Animations)
- **`main.ts`**: Bootstrap usando `bootstrapApplication()`
- **`environment.ts`**: Configurações de desenvolvimento (URL da API, timeouts, etc)
- **`environment.prod.ts`**: Configurações de produção

---

## 5. Padrões e Convenções

### Standalone Components
Todos os componentes são standalone:
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, ...],
  // ...
})
```

### Injeção de Dependências Moderna
Uso de `inject()` em vez de constructor:
```typescript
private router = inject(Router);
private fb = inject(FormBuilder);
```

### Estado Reativo
BehaviorSubject para gerenciar estado:
```typescript
private productsSubject = new BehaviorSubject<Product[]>([]);
public products$ = this.productsSubject.asObservable();
```

### Reactive Forms
FormBuilder com validações:
```typescript
this.productForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  price: [0, [Validators.required, Validators.min(0.01)]]
});
```

### Error Handling
Tratamento centralizado em `api.service.ts`:
```typescript
.pipe(catchError(this.handleError))
```

---

## 6. Como Executar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm start
# Acesse: http://localhost:4200
```

### Build de Produção
```bash
npm run build
# Saída em: dist/product-crud
```

---

## 7. Configuração de Ambiente

O projeto utiliza arquivos de configuração de ambiente para gerenciar URLs e configurações específicas de cada ambiente.

### Arquivos de Ambiente

**`src/environments/environment.ts`** - Desenvolvimento
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // URL da API local
  enableDebugMode: true,
  apiTimeout: 30000,
  environmentName: 'development'
};
```

**`src/environments/environment.prod.ts`** - Produção
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.seudominio.com/api',  // URL da API de produção
  enableDebugMode: false,
  apiTimeout: 30000,
  environmentName: 'production'
};
```

### Como Usar

O `ApiService` automaticamente utiliza as configurações do environment:

```typescript
import { environment } from '../../../environments/environment';

private readonly API_BASE_URL = environment.apiUrl;
```

### Substituição Automática

O Angular CLI substitui automaticamente os arquivos durante o build:

- **Desenvolvimento**: `ng serve` → usa `environment.ts`
- **Produção**: `ng build --configuration=production` → substitui por `environment.prod.ts`

A configuração está no `angular.json`:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
  }
]
```

---

## 8. Próximos Passos

Para evoluir o projeto:

1. ✅ **Environment Config**: Criar `environment.ts` para configurar URLs por ambiente
2. **Interceptors**: Adicionar interceptor para autenticação/tokens
3. **Guards**: Implementar guards para proteger rotas
4. **Testes**: Adicionar testes unitários e E2E
5. **PWA**: Transformar em Progressive Web App
6. **Internacionalização**: Adicionar suporte a múltiplos idiomas
7. **Filtros e Busca**: Adicionar filtros na listagem
8. **Ordenação**: Permitir ordenação por colunas

---

**Desenvolvido seguindo as práticas oficiais do Angular 20** ✨

