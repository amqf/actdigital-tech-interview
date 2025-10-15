# ProductAPI

Uma API Web simples em ASP.NET Core que gerencia produtos. Este projeto utiliza um banco de dados em memória através do Entity Framework Core para prototipação rápida e integra o Swagger para documentação interativa da API.

## Funcionalidades

- Operações CRUD para produtos via controllers (veja [ProductsController.cs](ProductAPI/Controllers/ProductsController.cs))
- Suporte a banco de dados em memória usando o Entity Framework Core ([ProductDbContext.cs](ProductAPI/Data/ProductDbContext.cs))
- Utilização de Data Transfer Objects para encapsular os modelos de entrada/saída ([ProductDTO.cs](ProductAPI/DTOs/ProductDTO.cs))
- Integração com Swagger para exploração e teste da API

## Pré-requisitos

- [SDK .NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)

## Como Executar

### Ambiente de Desenvolvimento (Hot Reload)
1. Abra a pasta do projeto no Visual Studio Code.
2. Restaure as dependências:
    ```sh
    dotnet restore
    ```
3. Execute o projeto com hot-reload:
    ```sh
    dotnet watch run --project ProductAPI
    ```
   A API será executada com hot reload habilitado, ideal para desenvolvimento.

### Ambiente de Produção
1. Compile e publique o projeto para Release:
    ```sh
    dotnet publish --configuration Release --output ./publish ProductAPI
    ```
2. Navegue até o diretório de publicação:
    ```sh
    cd publish
    ```
3. Execute o aplicativo:
    ```sh
    dotnet ProductAPI.dll
    ```
   O aplicativo utilizará as configurações definidas em `appsettings.json` para o ambiente de produção.

## Qualidade de Código e Princípios SOLID

Este projeto foi desenvolvido seguindo os princípios do SOLID e as práticas de Clean Code:

- **Princípio da Responsabilidade Única (SRP):**
  Cada classe possui uma única responsabilidade (por exemplo, o modelo [`Product`](ProductAPI/Models/Product.cs), as classes de DTO em `ProductDTO.cs` e os controllers que gerenciam as requisições HTTP).

- **Princípio Aberto/Fechado (OCP):**
  A arquitetura foi projetada para ser estendida por meio da injeção de dependências e serviços modulares, permitindo que novas funcionalidades sejam adicionadas sem modificar o código existente.

- **Princípio da Substituição de Liskov (LSP):**
  Componentes, ao serem substituídos ou estendidos, cumprem os mesmos contratos, garantindo substituibilidade com impacto mínimo.

- **Princípio da Segregação de Interface (ISP):**
  Interfaces e serviços expõem apenas os métodos necessários, assegurando que os clientes dependam apenas do que realmente utilizam.

- **Princípio da Inversão de Dependência (DIP):**
  O uso da injeção de dependências nativa do ASP.NET Core desacopla os módulos de alto nível das implementações de baixo nível, facilitando a testabilidade e a manutenção.

Além disso, o código segue as práticas de Clean Code ao:
- Utilizar nomes significativos para classes, métodos e variáveis;
- Organizar arquivos e pastas por funcionalidades/responsabilidades;
- Empregar DTOs para clarificar a troca de dados entre as camadas;
- Manter o código modular, de fácil manutenção e extensível.

## Swagger

No modo de Desenvolvimento, o Swagger está habilitado para auxiliar na visualização e teste dos endpoints da API. Acesse-o através de:
```
https://localhost:<porta>/swagger
```