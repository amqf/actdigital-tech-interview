/**
 * Configuração de ambiente para STAGING (Homologação)
 * Este arquivo pode ser usado para testes em ambiente de homologação
 * 
 * Para usar este ambiente, adicione uma nova configuração no angular.json:
 * 
 * "configurations": {
 *   "staging": {
 *     "fileReplacements": [{
 *       "replace": "src/environments/environment.ts",
 *       "with": "src/environments/environment.staging.ts"
 *     }],
 *     ...
 *   }
 * }
 * 
 * E execute: ng build --configuration=staging
 */

export const environment = {
  production: false,
  
  // URL base da API no ambiente de staging
  apiUrl: 'https://staging-api.seudominio.com/api',
  
  // Configurações opcionais adicionais
  enableDebugMode: true,
  
  // Tempo de timeout para requisições (em ms)
  apiTimeout: 30000,
  
  // Nome do ambiente (útil para logs)
  environmentName: 'staging'
};

