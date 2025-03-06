using Credit_bank.Abstractions;
using Credit_bank.Abstractions.CreditRecords;
using Credit_bank.Models;

namespace Credit_bank.Services;

public class CreditRecordService : ICreditRecordService
{
    private readonly ICreditRecordRepository _repository;

    public CreditRecordService(ICreditRecordRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CreditRecord>> GetAllCreditRecords()
    {
        return await _repository.GetCreditRecordsAsync();
    }

    public async Task<int> CreateCreditRecord(CreditRecord creditRecord)
    {
        return await _repository.CreateCreditRecordAsync(creditRecord);
    }

    public async Task<int> UpdateCreditRecord(
        int id,
        string firstName,
        string lastName,
        decimal creditAmount,
        decimal interestRate)
    {
        return await _repository.UpdateCreditRecordAsync(id, firstName, lastName, creditAmount, interestRate);
    }

    public async Task<int> DeleteCreditRecord(int id)
    {
        return await _repository.DeleteCredticRecordAsync(id);
    }
}