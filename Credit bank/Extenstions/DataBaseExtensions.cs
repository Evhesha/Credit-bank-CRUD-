using Credit_bank.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Extenstions;
public static class DataBaseExtensions
{
    public static IServiceCollection AddDataBase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        return services;
    }
}