/**
 * Configuração de ambiente para DESENVOLVIMENTO
 * Este arquivo é usado quando rodamos 'ng serve' ou build sem --configuration=production
 */

export const environment = {
  production: false,
  
  // URL base da API no ambiente de desenvolvimento
  apiUrl: 'http://localhost:5215/api',
  
  // Configurações opcionais adicionais
  enableDebugMode: true,
  
  // Tempo de timeout para requisições (em ms)
  apiTimeout: 30000,
  
  // Nome do ambiente (útil para logs)
  environmentName: 'development'
};

