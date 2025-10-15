# Dockerfile para Frontend Angular 20
# Otimizado para ambiente de DESENVOLVIMENTO com hot reload

FROM node:22-alpine AS development

WORKDIR /app

# Instalar dependências primeiro (cache de layers)
COPY package*.json ./
RUN npm ci

# Copiar o código fonte
COPY . .

# Expor a porta do Angular dev server
EXPOSE 4200

# Configurar o Angular CLI para aceitar conexões externas (necessário para Docker)
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

