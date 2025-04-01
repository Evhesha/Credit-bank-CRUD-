using Credit_bank.Abstractions.Banker;
using Credit_bank.Models;
using Microsoft.AspNetCore.Mvc;

namespace Credit_bank.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BankerController : ControllerBase
{
    private readonly IBankerService _service;

    public BankerController(IBankerService service)
    {
        _service = service; 
    }

    [HttpGet]
    public async Task<ActionResult<List<Banker>>> GetAllBankers()
    {
        var bankers = await _service.GetAllBankers();
        var response = bankers.Select(c => new Banker
        {
            BankerId = c.BankerId,
            FirstName = c.FirstName,
            LastName = c.LastName,
            DepartmentNumber = c.DepartmentNumber
        }).ToList();
        
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Banker>> GetBankerById(int id)
    {
        var banker = await _service.GetBankerById(id);
        var response =  new Banker
        {
            BankerId = banker.BankerId,
            FirstName = banker.FirstName,
            LastName = banker.LastName,
            DepartmentNumber = banker.DepartmentNumber
        };
        
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateBanker(Banker banker)
    {
        var bankerEntity = new Banker
        {
            BankerId = banker.BankerId,
            FirstName = banker.FirstName,
            LastName = banker.LastName,
            DepartmentNumber = banker.DepartmentNumber
        };
        
        var bankerId = await _service.CreateBanker(bankerEntity);

        return Ok(bankerId);
    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<int>> UpdateBanker(int id, Banker banker)
    {
        var bankerId = await _service.UpdateBanker(
            id,
            banker.FirstName,
            banker.LastName,
            banker.DepartmentNumber);
        
        return Ok(bankerId);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Banker>> DeleteBanker(int id)
    {
        return Ok(await _service.DeleteBanker(id));
    }
}