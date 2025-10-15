#!/bin/bash
# Script de teste do ambiente Docker
# Valida se todos os serviços estão funcionando corretamente

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Teste do Ambiente ACT Digital ===${NC}\n"

# 1. Verificar se Docker está rodando
echo -n "1. Verificando Docker... "
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}FALHOU${NC}"
    echo "   Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi
echo -e "${GREEN}OK${NC}"

# 2. Verificar se Docker Compose está disponível
echo -n "2. Verificando Docker Compose... "
if ! docker-compose version > /dev/null 2>&1; then
    echo -e "${RED}FALHOU${NC}"
    echo "   Docker Compose não está instalado."
    exit 1
fi
echo -e "${GREEN}OK${NC}"

# 3. Verificar se os containers estão rodando
echo -n "3. Verificando containers... "
if ! docker-compose ps | grep -q "Up"; then
    echo -e "${YELLOW}AVISO${NC}"
    echo "   Containers não estão rodando. Execute: docker-compose up -d"
    exit 0
fi
echo -e "${GREEN}OK${NC}"

# 4. Verificar health do backend
echo -n "4. Verificando health do backend... "
sleep 2
backend_health=$(docker inspect actdigital-backend 2>/dev/null | grep -o '"Status":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ "$backend_health" != "healthy" ] && [ "$backend_health" != "running" ]; then
    echo -e "${YELLOW}AVISO${NC}"
    echo "   Backend status: $backend_health (aguarde mais alguns segundos)"
else
    echo -e "${GREEN}OK${NC} ($backend_health)"
fi

# 5. Verificar health do frontend
echo -n "5. Verificando health do frontend... "
frontend_health=$(docker inspect actdigital-frontend 2>/dev/null | grep -o '"Status":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ "$frontend_health" != "healthy" ] && [ "$frontend_health" != "running" ]; then
    echo -e "${YELLOW}AVISO${NC}"
    echo "   Frontend status: $frontend_health (aguarde mais alguns segundos)"
else
    echo -e "${GREEN}OK${NC} ($frontend_health)"
fi

# 6. Testar endpoint da API
echo -n "6. Testando API (GET /api/products)... "
if curl -sf http://localhost:5215/api/products > /dev/null; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FALHOU${NC}"
    echo "   API não está respondendo em http://localhost:5215/api/products"
    echo "   Verifique os logs: docker-compose logs backend"
fi

# 7. Testar Swagger
echo -n "7. Testando Swagger UI... "
if curl -sf http://localhost:5215/swagger/index.html > /dev/null; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}AVISO${NC}"
    echo "   Swagger pode não estar carregado ainda"
fi

# 8. Testar frontend
echo -n "8. Testando Frontend... "
if curl -sf http://localhost:4200 > /dev/null; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FALHOU${NC}"
    echo "   Frontend não está respondendo em http://localhost:4200"
    echo "   Verifique os logs: docker-compose logs frontend"
fi

# 9. Testar comunicação entre containers
echo -n "9. Testando comunicação interna... "
if docker-compose exec -T frontend wget -q -O- http://backend:5215/api/products > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}AVISO${NC}"
    echo "   Comunicação interna pode estar com problemas"
fi

echo -e "\n${GREEN}=== Resumo ===${NC}"
echo "Frontend:     http://localhost:4200"
echo "Backend API:  http://localhost:5215"
echo "Swagger UI:   http://localhost:5215/swagger"
echo ""
echo -e "${YELLOW}Comandos úteis:${NC}"
echo "  docker-compose logs -f          # Ver todos os logs"
echo "  docker-compose logs -f backend  # Logs do backend"
echo "  docker-compose logs -f frontend # Logs do frontend"
echo "  docker-compose restart          # Reiniciar tudo"
echo ""
echo -e "${GREEN}Teste concluído!${NC}"

