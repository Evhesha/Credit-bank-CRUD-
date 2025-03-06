namespace Credit_bank.Abstractions.Banker;

public interface IBankerRepository
{
    Task<List<Models.Banker>> GetBankersAsync();
    Task<Models.Banker?> GetBankerAsync(int id);
    Task<int> CreateBankerAsync(Models.Banker banker);

    Task<int> UpdateBankerAsync(
        int id,
        string firstName,
        string lastName,
        int departmentNumber);

    Task<int> DeleteBankerAsync(int id);
}