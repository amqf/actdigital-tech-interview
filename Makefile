# Makefile para facilitar comandos Docker do projeto ACT Digital
# Uso: make <comando>

.PHONY: help up down restart logs build clean rebuild status shell-backend shell-frontend test-api install-backend install-frontend

# Cores para output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

help: ## Mostra esta mensagem de ajuda
	@echo "$(GREEN)ACT Digital - Comandos Docker$(NC)"
	@echo ""
	@echo "$(YELLOW)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

up: ## Inicia todos os serviços
	@echo "$(GREEN)Iniciando serviços...$(NC)"
	docker-compose up

up-d: ## Inicia todos os serviços em background
	@echo "$(GREEN)Iniciando serviços em background...$(NC)"
	docker-compose up -d
	@echo "$(YELLOW)Aguarde ~30s para os serviços estarem prontos$(NC)"
	@echo "$(GREEN)Frontend:$(NC) http://localhost:4200"
	@echo "$(GREEN)Backend:$(NC)  http://localhost:5215"
	@echo "$(GREEN)Swagger:$(NC)  http://localhost:5215/swagger"

down: ## Para todos os serviços
	@echo "$(YELLOW)Parando serviços...$(NC)"
	docker-compose down

restart: ## Reinicia todos os serviços
	@echo "$(YELLOW)Reiniciando serviços...$(NC)"
	docker-compose restart

restart-backend: ## Reinicia apenas o backend
	@echo "$(YELLOW)Reiniciando backend...$(NC)"
	docker-compose restart backend

restart-frontend: ## Reinicia apenas o frontend
	@echo "$(YELLOW)Reiniciando frontend...$(NC)"
	docker-compose restart frontend

logs: ## Mostra logs de todos os serviços
	docker-compose logs -f

logs-backend: ## Mostra logs do backend
	docker-compose logs -f backend

logs-frontend: ## Mostra logs do frontend
	docker-compose logs -f frontend

build: ## Constrói as imagens Docker
	@echo "$(GREEN)Construindo imagens...$(NC)"
	docker-compose build

rebuild: ## Reconstrói as imagens do zero e inicia
	@echo "$(YELLOW)Reconstruindo tudo do zero...$(NC)"
	docker-compose down
	docker-compose build --no-cache
	docker-compose up

clean: ## Remove containers, volumes e imagens
	@echo "$(RED)Removendo tudo...$(NC)"
	docker-compose down -v
	docker system prune -f

status: ## Mostra status dos containers
	@echo "$(GREEN)Status dos containers:$(NC)"
	@docker-compose ps

health: ## Verifica health dos serviços
	@echo "$(GREEN)Health Check dos serviços:$(NC)"
	@docker inspect actdigital-backend 2>/dev/null | grep -A 5 '"Health"' || echo "$(RED)Backend não está rodando$(NC)"
	@echo ""
	@docker inspect actdigital-frontend 2>/dev/null | grep -A 5 '"Health"' || echo "$(RED)Frontend não está rodando$(NC)"

shell-backend: ## Abre shell no container do backend
	@echo "$(GREEN)Abrindo shell no backend...$(NC)"
	docker-compose exec backend bash

shell-frontend: ## Abre shell no container do frontend
	@echo "$(GREEN)Abrindo shell no frontend...$(NC)"
	docker-compose exec frontend sh

test-api: ## Testa a API (GET /api/products)
	@echo "$(GREEN)Testando API...$(NC)"
	@curl -s http://localhost:5215/api/products | python3 -m json.tool || curl -s http://localhost:5215/api/products

install-backend: ## Adiciona pacote NuGet (uso: make install-backend PKG=nome)
	@if [ -z "$(PKG)" ]; then \
		echo "$(RED)Erro: Especifique o pacote com PKG=nome$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Instalando $(PKG) no backend...$(NC)"
	cd backend/ProductAPI && dotnet add package $(PKG)
	@echo "$(YELLOW)Reiniciando backend...$(NC)"
	docker-compose restart backend

install-frontend: ## Adiciona pacote npm (uso: make install-frontend PKG=nome)
	@if [ -z "$(PKG)" ]; then \
		echo "$(RED)Erro: Especifique o pacote com PKG=nome$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Instalando $(PKG) no frontend...$(NC)"
	cd frontend && npm install $(PKG)
	@echo "$(YELLOW)Reconstruindo frontend...$(NC)"
	docker-compose up --build -d frontend

stats: ## Mostra estatísticas de uso dos containers
	docker stats actdigital-backend actdigital-frontend

open: ## Abre os serviços no navegador
	@echo "$(GREEN)Abrindo serviços no navegador...$(NC)"
	@xdg-open http://localhost:4200 2>/dev/null || open http://localhost:4200 || echo "$(YELLOW)Abra manualmente: http://localhost:4200$(NC)"
	@sleep 1
	@xdg-open http://localhost:5215/swagger 2>/dev/null || open http://localhost:5215/swagger || echo "$(YELLOW)Abra manualmente: http://localhost:5215/swagger$(NC)"

# Aliases úteis
start: up-d ## Alias para up-d
stop: down ## Alias para down
log: logs ## Alias para logs
ps: status ## Alias para status

# Default target
.DEFAULT_GOAL := help

