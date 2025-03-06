namespace Credit_bank.Models;

public class Banker
{
    public int BankerId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int DepartmentNumber { get; set; }
}