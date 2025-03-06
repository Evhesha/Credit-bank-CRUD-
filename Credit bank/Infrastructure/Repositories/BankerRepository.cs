using Credit_bank.Abstractions.Banker;
using Credit_bank.Models;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Infrastructure.Repositories;

public class BankerRepository : IBankerRepository
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
            .FirstOrDefaultAsync(b => b.BankerId == id);
    }

    public async Task<int> CreateBankerAsync(Banker banker)
    {
        var bankerEntity = new Banker
        {
            BankerId = banker.BankerId,
            FirstName = banker.FirstName,
            LastName = banker.LastName,
            DepartmentNumber = banker.DepartmentNumber
        };
        
        await _context.Bankers.AddAsync(bankerEntity);
        await _context.SaveChangesAsync();
        
        return banker.BankerId;
    }

    public async Task<int> UpdateBankerAsync(
        int id,
        string firstName,
        string lastName,
        int departmentNumber)
    {
        var banker = await _context.Bankers.FindAsync(id);
        if (banker != null)
        {
            banker.FirstName = firstName;
            banker.LastName = lastName;
            banker.DepartmentNumber = departmentNumber;
            
            await _context.SaveChangesAsync();
        }
        
        return id;
    }

    public async Task<int> DeleteBankerAsync(int id)
    {
        var banker = await _context.Bankers.FindAsync(id);
        if (banker != null)
        {
            _context.Bankers.Remove(banker);
            await _context.SaveChangesAsync();
        }
        
        return id;
    }
}