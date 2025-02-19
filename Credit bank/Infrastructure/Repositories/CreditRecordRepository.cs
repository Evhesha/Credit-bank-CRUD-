using Credit_bank.Models;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Infrastructure.Repositories;

public class CreditRecordRepository
{
    private readonly ApplicationDbContext _context;

    public CreditRecordRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CreditRecord>> GetCreditRecordsAsync()
    {
        return _context.CreditRecords
            .AsNoTracking()
            .ToList();
    }

    // public async Task<int> CreateCreditRecordAsync(CreditRecord creditRecord)
    // {
    //     
    // }
    //
    // public async Task<int> UpdateCreditRecordAsync(
    //     string firstName,
    //     string lastName,
    //     decimal amount,
    //     decimal interestRate)
    // {
    //     
    // }

    public async Task<int> DeleteCredticRecordAsync(int id)
    {
        var creditRecord = await _context.CreditRecords.FindAsync(id);

        if (creditRecord is not null)
        {
            _context.CreditRecords.Remove(creditRecord);
            await _context.SaveChangesAsync();
        }

        return id;
    }
}