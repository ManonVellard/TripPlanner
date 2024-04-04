public class SeedData
{
    public static void Init()
    {
        using (var context = new APIContext())
        {
            if (context.Sites.Any() || context.Villes.Any() || context.Pays.Any())
            {
                return;
            }

            Site site1 = new Site
            {
                Id = 1,
                Nom = "Tour Eiffel",
                CoorGPS = "2.2945,48.8584",
                DureeVisite = 2.5,
                Type = "Monument",
                HoraireOuv = 9.00,
                HoraireFer = 23.00,
                IdPays = 1
            };
            Site site2 = new Site
            {
                Id = 2,
                Nom = "Musée du Louvre",
                CoorGPS = "2.3376,48.8606",
                DureeVisite = 4.0,
                Type = "Musée",
                HoraireOuv = 9.00,
                HoraireFer = 18.00,
                IdPays = 1
            };
            Site site3 = new Site
            {
                Id = 3,
                Nom = "Cathédrale Notre-Dame de Paris",
                CoorGPS = "2.3499,48.8530",
                DureeVisite = 1.5,
                Type = "Monument religieux",
                HoraireOuv = 8.00,
                HoraireFer = 18.00,
                IdPays = 1
            };
            Site site4 = new Site
            {
                Id = 4,
                Nom = "Basilique du Sacré-Cœur",
                CoorGPS = "2.3431,48.8867",
                DureeVisite = 2.0,
                Type = "Monument",
                HoraireOuv = 6.00,
                HoraireFer = 22.00,
                IdPays = 1
            };
            Site site10 = new Site
            {
                Id = 10,
                Nom = "Futuroscope",
                CoorGPS = "46.6665,-0.3671",
                DureeVisite = 1.5,
                Type = "Parc d'attractions",
                HoraireOuv = 10.00,
                HoraireFer = 20.00,
                IdPays = 1 // L'ID de la France dans votre base de données
            };

            Site site20 = new Site
            {
                Id = 20,
                Nom = "La Rochelle - Vieux Port",
                CoorGPS = "46.1591,-1.1520",
                DureeVisite = 2.0,
                Type = "Port de plaisance",
                HoraireOuv = 8.00,
                HoraireFer = 22.00,
                IdPays = 1 // L'ID de la France dans votre base de données
            };

            Site site30 = new Site
            {
                Id = 30,
                Nom = "Île de Ré",
                CoorGPS = "46.1926,-1.3922",
                DureeVisite = 1.5,
                Type = "Île",
                HoraireOuv = 24.00, // Ouvert 24 heures
                HoraireFer = 24.00, // Ouvert 24 heures
                IdPays = 1 // L'ID de la France dans votre base de données
            };

            Ville ville1 = new Ville
            {
                Id = 1,
                Nom = "Paris",
                ListeSites = new List<Site> { site1, site2, site3, site4,site10,site20,site30 },
                IdPays = 1
            };

            Pays pays1 = new Pays
            {
                Id = 1,
                Nom = "France",
                ListeVilles = new List<Ville> { ville1 }
            };

            Site site5 = new Site
            {
                Id = 5,
                Nom = "Mont Fuji",
                CoorGPS = "35.3606,138.7274",
                DureeVisite = 1.5,
                Type = "Montagne",
                HoraireOuv = 24.00,
                HoraireFer = 24.00,
                IdPays = 2
            };
            Site site6 = new Site
            {
                Id = 6,
                Nom = "Temple Senso-ji",
                CoorGPS = "35.7146,139.7967",
                DureeVisite = 2,
                Type = "Temple bouddhiste",
                HoraireOuv = 6.00,
                HoraireFer = 17.00,
                IdPays = 2
            };
            Site site7 = new Site
            {
                Id = 7,
                Nom = "Château de Himeji",
                CoorGPS = "34.8394,134.6939",
                DureeVisite = 3,
                Type = "Château",
                HoraireOuv = 9.00,
                HoraireFer = 17.00,
                IdPays = 2
            };

            Ville ville2 = new Ville
            {
                Id = 2,
                Nom = "Tokyo",
                ListeSites = new List<Site> { site5, site6, site7 },
                IdPays = 2
            };
            Pays pays2 = new Pays
            {
                Id = 2,
                Nom = "Japon",
                ListeVilles = new List<Ville> { ville2 }
            };

            Voyage voyage1 = new Voyage
            {
                Id = 1,
                IdUtilisateur = 1
            };

            context.Sites.AddRange(
                site1,
                site2,
                site3,
                site4,
                site5,
                site6,
                site7,
                site10,
                site20,
                site30
            );

            context.Villes.AddRange(
                ville1,
                ville2
            );
            context.Pays.AddRange(
                pays1,
                pays2
            );
            voyage1.SitesVisites.Add(site1);
            voyage1.SitesVisites.Add(site2);
            voyage1.SitesVisites.Add(site3);
            voyage1.SitesVisites.Add(site4);

            voyage1.MoyensTransports.Add("en voiture");
            voyage1.MoyensTransports.Add("en voiture");
            voyage1.MoyensTransports.Add("en voiture");
            voyage1.MoyensTransports.Add("en voiture");
            context.Voyages.AddRange(voyage1);
            context.SaveChanges();
        }
    }
}