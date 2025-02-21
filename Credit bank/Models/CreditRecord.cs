namespace Credit_bank.Models;

public class CreditRecord
{
    // public CreditRecord(
    //     int creditRecordId,
    //     string firstName,
    //     string lastName,
    //     decimal creditAmount,
    //     decimal interestRate
    //     )
    // {
    //     CreditRecordId = creditRecordId;
    //     FirstName = firstName;
    //     LastName = lastName;
    //     CreditAmount = creditAmount;
    //     InterestRate = interestRate;
    // }
    //
    
    public int CreditRecordId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public decimal CreditAmount { get; set; }
    public decimal InterestRate { get; set; }
}