#!/bin/bash
# Script de início rápido do ambiente
# Sobe os serviços e aguarda ficarem prontos

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   ACT Digital - Início Rápido         ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Erro: Docker não está rodando!${NC}"
    echo "Inicie o Docker Desktop e tente novamente."
    exit 1
fi

# Perguntar se deve fazer build
echo -e "${YELLOW}Deseja reconstruir as imagens? (s/N)${NC}"
read -r response
if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
    echo -e "${YELLOW}Reconstruindo imagens...${NC}"
    docker-compose build
fi

# Subir os serviços
echo -e "${GREEN}Iniciando serviços...${NC}"
docker-compose up -d

# Aguardar serviços ficarem prontos
echo -e "${YELLOW}Aguardando serviços ficarem prontos...${NC}"
echo -n "Backend (pode levar ~30s): "

max_attempts=60
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if curl -sf http://localhost:5215/api/products > /dev/null 2>&1; then
        echo -e "${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}TIMEOUT${NC}"
    echo "Backend demorou muito para responder. Verifique os logs:"
    echo "  docker-compose logs backend"
fi

echo -n "Frontend (pode levar ~60s): "
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if curl -sf http://localhost:4200 > /dev/null 2>&1; then
        echo -e "${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}TIMEOUT${NC}"
    echo "Frontend demorou muito para responder. Verifique os logs:"
    echo "  docker-compose logs frontend"
fi

# Mostrar resumo
echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        Ambiente Pronto! 🚀             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}\n"

echo -e "${BLUE}📱 Serviços disponíveis:${NC}"
echo -e "  Frontend:   ${GREEN}http://localhost:4200${NC}"
echo -e "  Backend:    ${GREEN}http://localhost:5215${NC}"
echo -e "  Swagger:    ${GREEN}http://localhost:5215/swagger${NC}"

echo -e "\n${BLUE}📊 Comandos úteis:${NC}"
echo -e "  ${YELLOW}make logs${NC}           # Ver logs de todos os serviços"
echo -e "  ${YELLOW}make status${NC}         # Ver status dos containers"
echo -e "  ${YELLOW}make restart${NC}        # Reiniciar serviços"
echo -e "  ${YELLOW}make down${NC}           # Parar serviços"
echo -e "  ${YELLOW}make help${NC}           # Ver todos os comandos"

echo -e "\n${BLUE}🔍 Para ver os logs em tempo real:${NC}"
echo -e "  ${YELLOW}docker-compose logs -f${NC}"

# Perguntar se deve abrir no navegador
echo -e "\n${YELLOW}Deseja abrir os serviços no navegador? (S/n)${NC}"
read -r response
if [[ ! "$response" =~ ^([nN][aA][oO]|[nN])$ ]]; then
    echo -e "${GREEN}Abrindo navegador...${NC}"
    xdg-open http://localhost:4200 2>/dev/null || open http://localhost:4200 || echo "Abra manualmente: http://localhost:4200"
    sleep 1
    xdg-open http://localhost:5215/swagger 2>/dev/null || open http://localhost:5215/swagger || echo "Abra manualmente: http://localhost:5215/swagger"
fi

echo -e "\n${GREEN}Bom trabalho! 💻${NC}\n"

