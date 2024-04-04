public class Ville
{
    public int Id { get; set; }
    public string Nom { get; set; }
    public List<Site> ListeSites { get; set; }
    public int IdPays { get; set; }
    public Ville()
        {
            ListeSites = new List<Site>(); 
        }
}