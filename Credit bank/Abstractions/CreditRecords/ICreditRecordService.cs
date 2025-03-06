using Credit_bank.Models;

namespace Credit_bank.Abstractions.CreditRecords;

public interface ICreditRecordService
{
    Task<List<CreditRecord>> GetAllCreditRecords();
    Task<int> CreateCreditRecord(CreditRecord creditRecord);

    Task<int> UpdateCreditRecord(
        int id,
        string firstName,
        string lastName,
        decimal creditAmount,
        decimal interestRate);

    Task<int> DeleteCreditRecord(int id);
}