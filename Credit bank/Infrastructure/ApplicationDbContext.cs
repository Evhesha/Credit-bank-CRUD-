using Credit_bank.Models;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public DbSet<CreditRecord> CreditRecords { get; set; }
    public DbSet<Banker> Bankers { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }
}