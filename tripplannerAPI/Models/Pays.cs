public class Pays 
{
    public int Id { get; set; }
    public string Nom { get; set; }

    public List<Ville> ListeVilles { get; set; }
    public Pays()
        {
            ListeVilles = new List<Ville>(); 
        }
}