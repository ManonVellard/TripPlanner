using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/pays")]
public class PaysController : ControllerBase
{
    private readonly APIContext _context;
    public PaysController(APIContext context)
    {
        _context = context;
    }

    //METHODE GET
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pays>>> GetPays()
    {
        var pays = _context.Pays;
        return await pays.ToListAsync();
    }
}
