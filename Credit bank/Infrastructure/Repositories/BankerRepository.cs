using Credit_bank.Models;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Infrastructure.Repositories;

public class BankerRepository
{
    private readonly ApplicationDbContext _context;
    
    public BankerRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Banker>> GetBankersAsync()
    {
        return await _context.Bankers
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Banker?> GetBankerAsync(int id)
    {
        return await _context.Bankers
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id);
    }
    
    
}