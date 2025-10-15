/**
 * Configuração de ambiente para DESENVOLVIMENTO com DOCKER
 * Este arquivo pode ser usado quando rodamos o frontend em Docker
 */

export const environment = {
  production: false,
  
  // URL base da API quando rodando em Docker
  // Usa 'backend' que é o nome do serviço no docker-compose
  apiUrl: 'http://localhost:5215/api',
  
  // Configurações opcionais adicionais
  enableDebugMode: true,
  
  // Tempo de timeout para requisições (em ms)
  apiTimeout: 30000,
  
  // Nome do ambiente (útil para logs)
  environmentName: 'docker-development'
};

