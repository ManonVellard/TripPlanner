export function requeteAPIDriving(coorDepart, coorArrivee) {
  const apiUrl =
    "http://127.0.0.1:5000/route/v1/driving/" +
    coorDepart +
    ";" +
    coorArrivee +
    "?steps=true";
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function requeteAPIWalking(coorDepart, coorArrivee) {
  const apiUrl =
    "http://127.0.0.1:5000/route/v1/walking/" +
    coorDepart +
    ";" +
    coorArrivee +
    "?steps=true";
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function calculDureeVoiture(coorDepart, coorArrivee) {
  return requeteAPIDriving(coorDepart, coorArrivee)
    .then((data) => {
      return data.routes[0].duration;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function calculDureePied(coorDepart, coorArrivee) {
  return requeteAPIWalking(coorDepart, coorArrivee)
    .then((data) => {
      return data.routes[0].duration;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Fonction qui calcule le trajet le plus court entre tous les points à visiter
//Entrée : tableau de coordonnées
//Sortie : tableau de coordonnées et des moyens de transport sous forme [{ coordonnee: " ", by: " " }]
export async function calculRoute(tab) {
  const trajetPlusCourt = [{ coordonnee: tab[0], by: " " }];
  let coordonneeDepart = tab[0];
  while (trajetPlusCourt.length < tab.length) {
    // Calculer les temps de trajet pour chaque coordonnée par rapport à la coordonnée de départ
    const tempsTrajetsVoiture = [];
    const tempsTrajetsPied = [];
    for (let i = 1; i < tab.length; i++) {
      if (!trajetPlusCourt.some((etape) => etape.coordonnee === tab[i])) {
        // Ne pas inclure les coordonnées déjà visitées
        const tempsTrajetVoiture = await calculDureeVoiture(
          coordonneeDepart,
          tab[i]
        );
        tempsTrajetsVoiture.push({
          index: i,
          temps: tempsTrajetVoiture,
          by: "en voiture",
        });

        const tempsTrajetPied = await calculDureePied(coordonneeDepart, tab[i]);
        tempsTrajetsPied.push({
          index: i,
          temps: tempsTrajetPied,
          by: "à pied",
        });
      }
    }
    //Comparer les meilleurs trajets (voiture ou à pied) et les mettre dans tempsTrajet
    const tempsTrajets = [];

    for (let i = 0; i < tempsTrajetsPied.length; i++) {
      // Favoriser le trajet à pied si la durée est inférieure à 20 minutes
      if (tempsTrajetsPied[i].temps < 20) {
        tempsTrajets.push(tempsTrajetsPied[i]);
      } else {
        // Sinon, comparer les temps de trajet en voiture et ajouter le plus petit au tableau
        if (tempsTrajetsPied[i].temps < tempsTrajetsVoiture[i].temps) {
          tempsTrajets.push(tempsTrajetsPied[i]);
        } else {
          tempsTrajets.push(tempsTrajetsVoiture[i]);
        }
      }
    }

    // Trouver la coordonnée la plus proche (temps de trajet le plus court)
    tempsTrajets.sort((a, b) => a.temps - b.temps);
    const prochaineCoordonneeIndex = tempsTrajets[0].index;
    const prochaineCoordonneeMoyenTransport = tempsTrajets[0].by;
    const prochaineCoordonnee = {
      coordonnee: tab[prochaineCoordonneeIndex],
      by: prochaineCoordonneeMoyenTransport,
    };

    trajetPlusCourt.push(prochaineCoordonnee);
    coordonneeDepart = prochaineCoordonnee.coordonnee;
  }

  return trajetPlusCourt;
}
