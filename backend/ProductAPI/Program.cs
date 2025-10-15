using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseInMemoryDatabase("ProductDb"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração CORS para desenvolvimento
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

var logger = app.Services.GetRequiredService<ILogger<Program>>();

logger.LogInformation(
	"Iniciando ProductAPI - Ambiente: {Environment}",
	app.Environment.EnvironmentName
);
logger.LogInformation(
	"Usando banco de dados InMemory para persistência"
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    logger.LogInformation(
	"Swagger habilitado em /swagger"
    );
}

if (!app.Environment.IsDevelopment())
{
    logger.LogWarning(
	"Política CORS permissiva (AllowAll) ativa em ambiente de produção"
    );
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

logger.LogInformation(
	"ProductAPI pronta para receber requisições"
);

app.Run();
