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

export async function calculRoute(tab) {
  const trajetPlusCourt = [{ coordonnee: tab[0], by: " " }];
  let coordonneeDepart = tab[0];
  // Tant qu'il reste des coordonnées à visiter
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
      // Comparer les valeurs et ajouter la plus petite au nouveau tableau
      if (tempsTrajetsPied[i].temps < tempsTrajetsVoiture[i].temps) {
        tempsTrajets.push(tempsTrajetsPied[i]);
      } else {
        tempsTrajets.push(tempsTrajetsVoiture[i]);
      }
    }

    // Trouver la coordonnée la plus proche (temps de trajet le plus court)
    tempsTrajets.sort((a, b) => a.temps - b.temps); // Trier par temps de trajet croissant
    const prochaineCoordonneeIndex = tempsTrajets[0].index;
    const prochaineCoordonneeMoyenTransport = tempsTrajets[0].by;
    const prochaineCoordonnee = {
      coordonnee: tab[prochaineCoordonneeIndex],
      by: prochaineCoordonneeMoyenTransport,
    };

    // Ajouter la coordonnée la plus proche au voyage organisé
    trajetPlusCourt.push(prochaineCoordonnee);

    // Mettre à jour la coordonnée de départ pour la prochaine itération
    coordonneeDepart = prochaineCoordonnee.coordonnee;
  }

  return trajetPlusCourt;
}

export function comparerTableaux(tab1, tab2) {
  // Vérifier si les tableaux ont la même longueur
  if (tab1.length !== tab2.length) {
    console.error("Les tableaux n'ont pas la même longueur.");
    return;
  }

  const plusPetitesValeurs = [];

  // Parcourir les tableaux et comparer les valeurs
  for (let i = 0; i < tab1.length; i++) {
    const valeur1 = tab1[i].temps;
    const valeur2 = tab2[i].temps;

    // Comparer les valeurs et ajouter la plus petite au nouveau tableau
    if (valeur1 < valeur2) {
      plusPetitesValeurs.push(valeur1);
    } else {
      plusPetitesValeurs.push(valeur2);
    }
  }

  return plusPetitesValeurs;
}
