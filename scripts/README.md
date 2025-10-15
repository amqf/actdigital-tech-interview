# Scripts de Desenvolvimento

Scripts auxiliares para facilitar o desenvolvimento com Docker.

## 📜 Scripts Disponíveis

### `quick-start.sh`

Script de início rápido que:
- Verifica pré-requisitos (Docker, Docker Compose)
- Pergunta se deve reconstruir as imagens
- Sobe os serviços em background
- Aguarda os serviços ficarem prontos
- Mostra resumo e links
- Opcionalmente abre no navegador

**Uso**:
```bash
./scripts/quick-start.sh
```

### `test-environment.sh`

Script de validação que testa:
1. ✅ Docker está rodando
2. ✅ Docker Compose está disponível
3. ✅ Containers estão ativos
4. ✅ Health checks do backend
5. ✅ Health checks do frontend
6. ✅ API está respondendo
7. ✅ Swagger está acessível
8. ✅ Frontend está acessível
9. ✅ Comunicação interna entre containers

**Uso**:
```bash
./scripts/test-environment.sh
```

**Saída esperada**:
```
=== Teste do Ambiente ACT Digital ===

1. Verificando Docker... OK
2. Verificando Docker Compose... OK
3. Verificando containers... OK
4. Verificando health do backend... OK (healthy)
5. Verificando health do frontend... OK (healthy)
6. Testando API (GET /api/products)... OK
7. Testando Swagger UI... OK
8. Testando Frontend... OK
9. Testando comunicação interna... OK

=== Resumo ===
Frontend:     http://localhost:4200
Backend API:  http://localhost:5215
Swagger UI:   http://localhost:5215/swagger

Teste concluído!
```

## 🔧 Permissões

Os scripts devem ser executáveis:

```bash
# Tornar executáveis (já feito)
chmod +x scripts/*.sh

# Verificar
ls -la scripts/
```

## 🚀 Workflows Comuns

### Primeira vez no projeto

```bash
# 1. Iniciar ambiente
./scripts/quick-start.sh

# 2. Validar que tudo está OK
./scripts/test-environment.sh
```

### Desenvolvimento diário

```bash
# Manhã: Subir ambiente
make up-d

# Durante o dia: Apenas edite os arquivos
# Hot reload cuida de recarregar automaticamente

# Fim do dia: Parar ambiente
make down
```

### Debugar problemas

```bash
# 1. Testar ambiente
./scripts/test-environment.sh

# 2. Ver logs
make logs

# 3. Se necessário, reconstruir
make rebuild
```

## 📝 Notas

- Todos os scripts são **idempotentes** - podem ser executados múltiplas vezes sem problemas
- Scripts usam **cores** para melhor visualização (verde = OK, amarelo = aviso, vermelho = erro)
- Scripts fazem **validações** antes de executar ações
- Scripts fornecem **mensagens claras** de erro com sugestões de solução

## 🆘 Troubleshooting

### "Permission denied"

```bash
chmod +x scripts/*.sh
```

### Scripts não funcionam no Windows

Use **Git Bash** ou **WSL2** para executar scripts shell.

Alternativa:
```bash
# Usar comandos make (funcionam no PowerShell também)
make up-d
make test-api
```

### Script trava / não termina

Interrompa com `Ctrl+C` e verifique os logs:
```bash
docker-compose logs
```

## 🔮 Futuros Scripts

Ideias para scripts adicionais:

- `backup-data.sh` - Backup de dados do ambiente
- `seed-data.sh` - Popular banco com dados de teste
- `run-tests.sh` - Executar testes automatizados
- `deploy-staging.sh` - Deploy para staging
- `benchmark.sh` - Testes de performance

## 📚 Referências

- [Bash Best Practices](https://bertvv.github.io/cheat-sheets/Bash.html)
- [Shell Script Style Guide](https://google.github.io/styleguide/shellguide.html)

