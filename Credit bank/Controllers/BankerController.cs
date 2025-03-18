using Credit_bank.Abstractions.Banker;
using Credit_bank.Models;
using Microsoft.AspNetCore.Mvc;

namespace Credit_bank.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BankerController : ControllerBase
{
    private readonly IBankerService _service;
    //
    public BankerController(IBankerService service)
    {
        _service = service; 
    }
    
    // public BankerController()
    // {
    //  
    // }
    // (Analysis paralysis) планируем еще один конструктор но ничего не делаем

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
    
    // [HttpPost("create-banker")]
    // public async Task<ActionResult> CreateBanker([FromBody] Banker banker)
    // {
    //     using (var dbContext = new ApplicationDbContext(new DbContextOptions<ApplicationDbContext>()))
    //     {
    //         var newBanker = new Banker
    //         {
    //             FirstName = banker.FirstName,
    //             LastName = banker.LastName,
    //             DepartmentNumber = banker.DepartmentNumber
    //         };
    //     if (string.IsNullOrEmpty(bankerEntity.FirstName))
    //     {
    //         return BadRequest("First name cannot be empty.");
    //     }
    //
    //      if (string.IsNullOrEmpty(bankerEntity.LastName))
    //      {
    //     return BadRequest("Last name cannot be empty.");
    //      }
    //
    //      if (bankerEntity.DepartmentNumber <= 0)
    //      {
    //     return BadRequest("Department number must be greater than 0.");
    //      }
    //
    //         dbContext.Bankers.Add(newBanker);
    //         await dbContext.SaveChangesAsync();
    //
    //         return Ok(newBanker);
    //     }
    // }
//(Big ball of Mud) Логика взаимодействия с БД внедрена прямо в контроллер, нарушая уровень ответственности.
//(Magic Button) вся обработка в одном методе котроллера
//(Gas Factory) избыточная проверка

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
    
    // [HttpPut("{id:int}")]
    // public async Task<ActionResult<Banker>> UpdateBanker(int id, Banker banker)
    // {
    //     var bankerId = await _service.UpdateBanker(
    //         id,
    //         banker.FirstName,
    //         banker.LastName,
    //         banker.DepartmentNumber);
    //     
    //     return Ok(52); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // }
    //(Magic number) Возвращаем число не зная его предназначения

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Banker>> DeleteBanker(int id)
    {
        return Ok(await _service.DeleteBanker(id));
    }
    
    // [HttpDelete("{id:int}")]
    // public async Task<ActionResult<Banker>> DeleteBanker(int id)
    // {
    //     return Ok(id);
    // }
    //(Smoke and mirrors) делаем вид, что метод рабочий
}