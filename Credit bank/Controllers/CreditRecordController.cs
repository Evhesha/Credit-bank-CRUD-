using Credit_bank.Abstractions;
using Credit_bank.Models;
using Microsoft.AspNetCore.Mvc;

namespace Credit_bank.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CreditRecordController : ControllerBase
{
    private readonly ICreditRecordRepository _repository;
    public CreditRecordController(ICreditRecordRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<List<CreditRecord>>> GetAllCreditRecords()
    {
        var credits = await _repository.GetCreditRecordsAsync();
        var response = credits.Select(c => new CreditRecord
        {
            CreditRecordId = c.CreditRecordId,
            FirstName = c.FirstName,
            LastName = c.LastName,
            CreditAmount = c.CreditAmount,
            InterestRate = c.InterestRate
        }).ToList();
        
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateCreditRecord(CreditRecord creditRecord)
    {
        var record = new CreditRecord
        {
            CreditRecordId = creditRecord.CreditRecordId,
            FirstName = creditRecord.FirstName,
            LastName = creditRecord.LastName,
            CreditAmount = creditRecord.CreditAmount,
            InterestRate = creditRecord.InterestRate
        };
        
        var recordId = await _repository.CreateCreditRecordAsync(record);
        return Ok(recordId);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<int>> UpdateCreditRecord(int id, CreditRecord creditRecord)
    {
        var creditRecordId = await _repository.UpdateCreditRecordAsync(
            id,
            creditRecord.FirstName,
            creditRecord.LastName,
            creditRecord.CreditAmount,
            creditRecord.InterestRate);

        return Ok(creditRecordId);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteCreditRecord(int id)
    {
        return Ok(await _repository.DeleteCredticRecordAsync(id));
    }
}