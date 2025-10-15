# Dockerfile para Backend .NET 8.0
# Otimizado para ambiente de DESENVOLVIMENTO com hot reload

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development

WORKDIR /app

# Copiar apenas os arquivos de projeto primeiro (cache de dependências)
COPY ProductAPI/*.csproj ProductAPI/
RUN dotnet restore ProductAPI/ProductAPI.csproj

# Copiar todo o código fonte
COPY ProductAPI/ ProductAPI/

# Expor a porta da aplicação
EXPOSE 5215

# Configurar variáveis de ambiente para desenvolvimento
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5215

# Usar dotnet watch para hot reload em desenvolvimento
WORKDIR /app/ProductAPI
CMD ["dotnet", "watch", "run", "--no-launch-profile"]

