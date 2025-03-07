using Credit_bank.Abstractions;
using Credit_bank.Abstractions.CreditRecords;
using Credit_bank.Models;
using Microsoft.AspNetCore.Mvc;

namespace Credit_bank.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CreditRecordController : ControllerBase
{
    private readonly ICreditRecordService _service;
    public CreditRecordController(ICreditRecordService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<CreditRecord>>> GetAllCreditRecords()
    {
        var credits = await _service.GetAllCreditRecords();
        var response = credits.Select(c => new CreditRecord
        {
            CreditRecordId = c.CreditRecordId,
            FirstName = c.FirstName,
            LastName = c.LastName,
            CreditAmount = c.CreditAmount,
            InterestRate = c.InterestRate,
            BankerId = c.BankerId,
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
            InterestRate = creditRecord.InterestRate,
            BankerId = creditRecord.BankerId,
        };
        
        var recordId = await _service.CreateCreditRecord(record);
        return Ok(recordId);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<int>> UpdateCreditRecord(int id, CreditRecord creditRecord)
    {
        var creditRecordId = await _service.UpdateCreditRecord(
            id,
            creditRecord.FirstName,
            creditRecord.LastName,
            creditRecord.CreditAmount,
            creditRecord.InterestRate);

        return Ok(creditRecordId);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCreditRecord(int id)
    {
        return Ok(await _service.DeleteCreditRecord(id));
    }
}