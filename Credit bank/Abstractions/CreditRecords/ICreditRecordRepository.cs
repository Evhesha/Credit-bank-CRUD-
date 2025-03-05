using Credit_bank.Models;

namespace Credit_bank.Abstractions;

public interface ICreditRecordRepository
{
    Task<List<CreditRecord>> GetCreditRecordsAsync();
    Task<int> CreateCreditRecordAsync(CreditRecord creditRecord);

    Task<int> UpdateCreditRecordAsync(
        int id,
        string firstName,
        string lastName,
        decimal amount,
        decimal interestRate);

    Task<int> DeleteCredticRecordAsync(int id);
}