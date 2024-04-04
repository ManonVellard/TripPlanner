using Microsoft.EntityFrameworkCore;


public class APIContext : DbContext
{
  public DbSet<Pays> Pays { get; set; } = null!;
  public DbSet<Ville> Villes { get; set; } = null!;
  public DbSet<Site> Sites { get; set; } = null!;
  public DbSet<Voyage> Voyages { get; set; } = null!;
  public DbSet<Utilisateur> Utilisateurs { get; set; } = null!;
  public string DbPath { get; private set; }


  public APIContext()
  {
    DbPath = "tripplannerAPI.db";
  }

  protected override void OnConfiguring(DbContextOptionsBuilder options)
  {
    options.UseSqlite($"Data Source={DbPath}");
  }
}
