namespace Credit_bank.Abstractions.Banker;

public interface IBankerService
{
    Task<List<Models.Banker>> GetAllBankers();
    Task<Models.Banker?> GetBankerById(int id);
    Task<int> CreateBanker(Models.Banker banker);

    Task<int> UpdateBanker(
        int id,
        string firstName,
        string lastName,
        int departmentNumber);
}