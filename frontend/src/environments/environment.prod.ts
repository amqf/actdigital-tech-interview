/**
 * Configuração de ambiente para PRODUÇÃO
 * Este arquivo é usado quando fazemos build com --configuration=production
 */

export const environment = {
  production: true,
  
  // URL base da API no ambiente de produção
  // IMPORTANTE: Substitua pela URL real da sua API em produção
  apiUrl: 'https://api.seudominio.com/api',
  
  // Configurações opcionais adicionais
  enableDebugMode: false,
  
  // Tempo de timeout para requisições (em ms)
  apiTimeout: 30000,
  
  // Nome do ambiente (útil para logs)
  environmentName: 'production'
};

