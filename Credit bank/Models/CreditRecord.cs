namespace Credit_bank.Models;

public class CreditRecord
{
    public int CreditRecordId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public decimal CreditAmount { get; set; }
    public decimal InterestRate { get; set; }
    public int BankerId { get; set; }
}