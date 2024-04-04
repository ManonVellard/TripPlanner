using System.ComponentModel.DataAnnotations.Schema;

public class Voyage 
{
    public int Id { get; set; }
    public List<Site> SitesVisites { get; set; }
    public int IdUtilisateur { get; set; }

    [NotMapped] //J'ai du mettre cette ligne car au moment de créer la bdd, List<string> était reconnu comme une clé primaire
    public List<string> MoyensTransports { get; set; } //contient la liste ordonnée des moyens de transport pour se rendre aux différents sites
    public Voyage()
        {
            SitesVisites = new List<Site>(); 
            MoyensTransports = new List<string>(); 
        }
}

