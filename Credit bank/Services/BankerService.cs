using Credit_bank.Abstractions.Banker;
using Credit_bank.Models;

namespace Credit_bank.Services;

public class BankerService : IBankerService
{
    private readonly IBankerRepository _repository;

    public BankerService(IBankerRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Banker>> GetAllBankers()
    {
        return await _repository.GetBankersAsync();
    }

    public async Task<Banker?> GetBankerById(int id)
    {
        return await _repository.GetBankerAsync(id);
    }

    public async Task<int> CreateBanker(Banker banker)
    {
        return await _repository.CreateBankerAsync(banker);
    }

    public async Task<int> UpdateBanker(
        int id,
        string firstName,
        string lastName,
        int departmentNumber)
    {
        return await _repository.UpdateBankerAsync(id, firstName, lastName, departmentNumber);
    }

    public async Task<int> DeleteBanker(int id)
    {
        return await _repository.DeleteBankerAsync(id);
    }
}