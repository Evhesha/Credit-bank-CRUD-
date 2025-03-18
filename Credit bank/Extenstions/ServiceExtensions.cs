using Credit_bank.Abstractions;
using Credit_bank.Abstractions.Banker;
using Credit_bank.Abstractions.CreditRecords;
using Credit_bank.Infrastructure.Repositories;
using Credit_bank.Services;

namespace Credit_bank.Extenstions;

public static class ServiceExtensions
{
    //
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ICreditRecordRepository, CreditRecordRepository>();
        services.AddScoped<ICreditRecordService, CreditRecordService>();
        
        services.AddScoped<IBankerRepository, BankerRepository>();
        services.AddScoped<IBankerService, BankerService>();
        
        //services.AddSingleton<IProducer<Null, string>>(provider => new ProducerBuilder<Null, string>(conf).Build())
        //(Software Boat) Подключили библиотеку, которая нигде не используется 
        return services;
    }
}