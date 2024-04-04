using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/voyage")]
public class VoyageController : ControllerBase
{
    private readonly APIContext _context;
    public VoyageController(APIContext context)
    {
        _context = context;
    }

    //METHODE GET
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Voyage>>> GetVoyages()
    {
        var voyages = _context.Voyages;
        return await voyages.ToListAsync();
    }

    // GET
    [HttpGet("{id}")]
    public async Task<ActionResult<Voyage>> GetVoyage(int id)
    {
        var item = await _context.Voyages.SingleOrDefaultAsync(t => t.Id == id);
        if (item == null)
            return NotFound();
        return item;
    }


    // POST
    [HttpPost]
    public async Task<ActionResult<Voyage>> PostTodos(Voyage voyage)
    {
        _context.Voyages.Add(voyage);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVoyage), new { id = voyage.Id }, voyage);
    }
}