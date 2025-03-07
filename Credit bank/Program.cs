using Credit_bank.Abstractions;
using Credit_bank.Abstractions.Banker;
using Credit_bank.Abstractions.CreditRecords;
using Credit_bank.Extenstions;
using Credit_bank.Infrastructure.Repositories;
using Credit_bank.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// builder.Services.AddScoped<ICreditRecordRepository, CreditRecordRepository>();
// builder.Services.AddScoped<IBankerRepository, BankerRepository>();
//
// builder.Services.AddScoped<ICreditRecordService, CreditRecordService>();
// builder.Services.AddScoped<IBankerService, BankerService>();

builder.Services.AddCustomCors(builder.Configuration);
builder.Services.AddDataBase(builder.Configuration);
builder.Services.AddApplicationServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();