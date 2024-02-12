export function requeteAPIDriving(coorDepart, coorArrivee) {
  //Requete API drive
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

export function calculDureeVoiture(coorDepart, coorArrivee) {
  return requeteAPIDriving(coorDepart, coorArrivee)
    .then((data) => {
      return data.routes[0].duration; //Calcul distance
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function calculRoute() {
  //tab = tableau des coordonnées des sites
  //Calculer du départ aux sites pour déterminer le premier site
  var tab = ["13.388860,52.517037", "13.385983,52.496891"];
  var tabTemps = [];
  tabTemps[0] = 0;
  //traiter cas particulier de taille = 2 ou 3
  for (let i = 1; i < tab.length - 2; i++) {
    //-2
    tabTemps[i] = calculDureeVoiture(tab[0], tab[i]);
  }
  var indexPlusCourt = trouverIndexPlusCourtTemps(tabTemps);
  alert(indexPlusCourt);
}

export function trouverIndexPlusCourtTemps(tab) {
  var index = 1;
  var resultat = tab[index];
  for (let i = 1; i < tab.length; i++) {
    if (tab[i] < resultat) {
      index = i;
    }
  }
  return index;
}
