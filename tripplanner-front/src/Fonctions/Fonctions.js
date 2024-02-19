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
  const trajetPlusCourt = [tab[0]]; 
  let coordonneeDepart = tab[0]; 

  // Tant qu'il reste des coordonnées à visiter
  while (trajetPlusCourt.length < tab.length) {
    // Calculer les temps de trajet pour chaque coordonnée par rapport à la coordonnée de départ
    const tempsTrajets = [];
    for (let i = 1; i < tab.length; i++) {
      if (!trajetPlusCourt.includes(tab[i])) {
        // Ne pas inclure les coordonnées déjà visitées
        const tempsTrajetVoiture = await calculDureeVoiture(coordonneeDepart, tab[i]);
        tempsTrajets.push({ index: i, temps: tempsTrajetVoiture, by: "voiture" });
      }
    }

    // Trouver la coordonnée la plus proche (temps de trajet le plus court)
    tempsTrajets.sort((a, b) => a.temps - b.temps); // Trier par temps de trajet croissant
    const prochaineCoordonneeIndex = tempsTrajets[0].index;
    const prochaineCoordonnee = tab[prochaineCoordonneeIndex];

    // Ajouter la coordonnée la plus proche au voyage organisé
    trajetPlusCourt.push(prochaineCoordonnee);

    // Mettre à jour la coordonnée de départ pour la prochaine itération
    coordonneeDepart = prochaineCoordonnee;
  }

  return trajetPlusCourt;
}

