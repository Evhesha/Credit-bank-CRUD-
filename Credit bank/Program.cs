using Credit_bank.Abstractions;
using Credit_bank.Infrastructure;
using Credit_bank.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5248); // HTTP
    options.ListenAnyIP(7234, listenOptions =>
    {
        listenOptions.UseHttps(); // Используем сертификат по умолчанию
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddScoped<ICreditRecordRepository, CreditRecordRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();