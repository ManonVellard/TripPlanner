using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/site")]
public class SiteController : ControllerBase
{
    private readonly APIContext _context;
    public SiteController(APIContext context)
    {
        _context = context;
    }

    //METHODE GET
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Site>>> GetSites()
    {
        var sites = _context.Sites;
        return await sites.ToListAsync();
    }

    //METHODE GET par pays
    [HttpGet("bypays/{idPays}")]
    public async Task<ActionResult<IEnumerable<Site>>> GetSitesByPays(int idPays)
    {
        var sites = await _context.Sites.Where(s => s.IdPays == idPays).ToListAsync();
        if (sites == null)
        {
            return NotFound();
        }
        return sites;
    }

    [HttpGet("byCoor/{coorGPS}")]
    public async Task<ActionResult<IEnumerable<Site>>> GetSitesByCoorGPS(string coorGPS)
    {
        var sites = await _context.Sites.Where(s => s.CoorGPS == coorGPS).ToListAsync();
        if (sites == null)
        {
            return NotFound();
        }
        return sites;
    }
}
