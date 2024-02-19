import React, { useState } from "react";
import "../Fonctions/Fonctions";
import { calculRoute } from "../Fonctions/Fonctions";

function Formulaire() {
  // État local pour stocker les coordonnées entrées par l'utilisateur
  const [coordonnees, setCoordonnees] = useState([
    { nom: "Départ", coordonnee: "" },
    { nom: "Arrivée", coordonnee: "" },
  ]); // État local pour garder une trace du nombre de sites ajoutés
  const [nombreSites, setNombreSites] = useState(0);
  const [trajetPlusCourt, setTrajetPlusCourt] = useState([]); // État local pour stocker le trajet le plus court

  // Fonction appelée lorsqu'un champ de formulaire est modifié
  const handleChange = (e, index) => {
    const newCoordonnees = [...coordonnees];
    newCoordonnees[index].coordonnee = e.target.value;
    setCoordonnees(newCoordonnees);
  };

  // Fonction appelée lorsque le formulaire est soumis
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Appel de la fonction calculRoute avec les coordonnées entrées par l'utilisateur
    const trajet = await calculRoute(
      coordonnees
        .filter((coordonnee) => coordonnee.nom !== "Arrivée")
        .map(({ coordonnee }) => coordonnee)
    );
    setTrajetPlusCourt(trajet);
  };

  // Fonction pour ajouter un champ de formulaire pour un nouveau site
  const handleAddSite = () => {
    const newNombreSites = nombreSites + 1;
    // Insérer le nouveau site entre "Départ" et "Arrivée"
    const updatedCoordonnees = [
      ...coordonnees.slice(0, -1), // "Départ" et sites ajoutés dynamiquement
      { nom: `Site ${newNombreSites}`, coordonnee: "" },
      ...coordonnees.slice(-1), // "Arrivée"
    ];
    setCoordonnees(updatedCoordonnees);
    setNombreSites(newNombreSites);
  };

  return (
    <div>
      <h2>Formulaire de Coordonnées</h2>
      <form onSubmit={handleSubmit}>
        {coordonnees.map(({ nom, coordonnee }, index) => (
          <div key={index}>
            <label>{`${nom}:`}</label>
            <select value={coordonnee} onChange={(e) => handleChange(e, index)}>
              <option value="13.40400,52.522000">
                Classik Alexander Plaza Hotel
              </option>
              <option value="13.24359,52.281499">Aeroport</option>
              <option value="13.377957,52.516267">Porte de Brandebourg</option>
              <option value="13.401078,52.519061">Berliner Dom</option>
              <option value="13.409419,52.520817">Fernsehturm Berlin</option>
              <option value="13.48583139,52.508664632">
                Musée de la Stasi
              </option>
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddSite}>
          Plus
        </button>
        <button type="submit">Envoyer</button>
      </form>
      {/* Affichage du trajet le plus court */}
      {trajetPlusCourt.length > 0 && (
        <div>
          <h3>Trajet le plus court :</h3>
          <p>
            {trajetPlusCourt.join(" -> ")} -&gt;{" "}
            {
              coordonnees.find((coordonnee) => coordonnee.nom === "Arrivée")
                .coordonnee
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default Formulaire;
