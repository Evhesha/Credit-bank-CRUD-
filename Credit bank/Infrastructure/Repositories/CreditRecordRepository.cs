using Credit_bank.Abstractions;
using Credit_bank.Models;
using Microsoft.EntityFrameworkCore;

namespace Credit_bank.Infrastructure.Repositories;

public class CreditRecordRepository : ICreditRecordRepository
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

    public async Task<int> CreateCreditRecordAsync(CreditRecord creditRecord)
    {
        var creditRecordEntity = new CreditRecord
        {
            CreditRecordId = creditRecord.CreditRecordId,
            FirstName = creditRecord.FirstName,
            LastName = creditRecord.LastName,
            CreditAmount = creditRecord.CreditAmount,
            InterestRate = creditRecord.InterestRate
        };

        await _context.CreditRecords.AddAsync(creditRecordEntity);
        await _context.SaveChangesAsync();
        
        return creditRecord.CreditRecordId;
    }
    
    public async Task<int> UpdateCreditRecordAsync(
        int id,
        string firstName,
        string lastName,
        decimal amount,
        decimal interestRate)
    {
        var creditRecord = await _context.CreditRecords.FindAsync(id);

        if (creditRecord is not null)
        {
            creditRecord.FirstName = firstName;
            creditRecord.LastName = lastName;
            creditRecord.CreditAmount = amount;
            creditRecord.InterestRate = interestRate;

            await _context.SaveChangesAsync();
        }
        
        return id;
    }

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