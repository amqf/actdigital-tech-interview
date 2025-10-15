# 🌍 Configurações de Ambiente

Esta pasta contém os arquivos de configuração para diferentes ambientes da aplicação.

## 📁 Arquivos Disponíveis

### `environment.ts` (Desenvolvimento)
Arquivo padrão usado durante o desenvolvimento local.

```bash
ng serve
# ou
npm start
```

**Uso**: Desenvolvimento local  
**URL da API**: `http://localhost:3000/api` (padrão)

---

### `environment.prod.ts` (Produção)
Arquivo usado para builds de produção.

```bash
ng build --configuration=production
# ou
npm run build
```

**Uso**: Deploy em produção  
**URL da API**: Deve ser configurada com a URL real da API em produção

---

### `environment.staging.ts` (Staging - Opcional)
Arquivo opcional para ambiente de homologação/testes.

Para usar, adicione a configuração no `angular.json`:

```json
"configurations": {
  "staging": {
    "fileReplacements": [{
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.staging.ts"
    }],
    "outputHashing": "all"
  }
}
```

E execute:
```bash
ng build --configuration=staging
```

**Uso**: Testes em ambiente de homologação  
**URL da API**: Deve ser configurada com a URL da API de staging

---

## 🔧 Como Funciona

O Angular CLI substitui automaticamente o arquivo `environment.ts` pelo arquivo correspondente durante o build, baseado na configuração especificada.

**Desenvolvimento**:
```bash
ng serve
# Usa: environment.ts
```

**Produção**:
```bash
ng build --configuration=production
# Substitui: environment.ts → environment.prod.ts
```

---

## 📝 Estrutura do Arquivo

Todos os arquivos de environment devem seguir esta estrutura:

```typescript
export const environment = {
  production: boolean,        // true para produção, false para dev
  apiUrl: string,            // URL base da API REST
  enableDebugMode: boolean,  // Habilita logs de debug
  apiTimeout: number,        // Timeout das requisições HTTP (ms)
  environmentName: string    // Nome do ambiente (para logs)
};
```

---

## 🚀 Exemplos de Uso no Código

### Importar configurações

```typescript
import { environment } from '../../../environments/environment';
```

### Acessar valores

```typescript
// URL da API
const apiUrl = environment.apiUrl;

// Verificar se está em produção
if (environment.production) {
  console.log('Rodando em produção');
}

// Usar configurações condicionalmente
if (environment.enableDebugMode) {
  console.debug('Debug info:', data);
}
```

---

## ⚙️ Personalizando Ambientes

Você pode adicionar mais propriedades aos arquivos de environment conforme necessário:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  
  // Novas configurações customizadas
  features: {
    enableAnalytics: false,
    enableChat: true,
    maxUploadSize: 5242880  // 5MB
  },
  
  apiKeys: {
    googleMaps: 'YOUR_API_KEY',
    firebase: 'YOUR_FIREBASE_KEY'
  },
  
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false
  }
};
```

---

## ⚠️ Boas Práticas

### ✅ FAÇA

- ✅ Mantenha URLs diferentes para cada ambiente
- ✅ Use `production: false` em ambientes de desenvolvimento/staging
- ✅ Documente configurações personalizadas
- ✅ Use valores padrão seguros

### ❌ NÃO FAÇA

- ❌ **NUNCA** commite chaves de API reais ou tokens secretos
- ❌ Não use a mesma URL de API para todos os ambientes
- ❌ Não habilite debug mode em produção
- ❌ Não use valores hardcoded no código - use environment

---

## 🔒 Segurança

### Variáveis Sensíveis

**IMPORTANTE**: Não commite informações sensíveis nos arquivos de environment!

Para dados sensíveis, considere:

1. **Variáveis de Ambiente do Sistema**
   ```typescript
   // Em vez de hardcode:
   apiKey: process.env['API_KEY']
   ```

2. **Arquivo Local Ignorado pelo Git**
   - Crie `environment.local.ts`
   - Adicione ao `.gitignore`
   - Use apenas localmente

3. **Secrets Management**
   - Use serviços como AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault

---

## 📚 Mais Informações

- [Documentação Oficial - Environments](https://angular.dev/tools/cli/environments)
- [Angular CLI - Configuration](https://angular.dev/tools/cli/build)
- [Build Configurations](https://angular.dev/tools/cli/build#configurations)

---

**Criado para o projeto CRUD de Produtos - Angular 20** ✨

