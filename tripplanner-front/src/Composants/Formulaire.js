import React, { useState } from "react";
import "../Fonctions/Fonctions";
import { calculRoute } from "../Fonctions/Fonctions";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function Formulaire() {
  const [coordonnees, setCoordonnees] = useState([
    { nom: "Départ", coordonnee: "" },
    { nom: "Arrivée", coordonnee: "" },
  ]);
  const [nombreSites, setNombreSites] = useState(0);
  const [trajetPlusCourt, setTrajetPlusCourt] = useState([]);
  const [pays, setPays] = useState(null);

  // Fonction appelée lorsqu'un champ de formulaire est modifié
  const handleChange = (newValue, index) => {
    const newCoordonnees = [...coordonnees];
    newCoordonnees[index].coordonnee = newValue;
    setCoordonnees(newCoordonnees);
  };

  // Fonction qui envoie le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pays) {
      alert("Veuillez sélectionner un pays");
      return;
    }
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
    // Mettre à jour les numéros des sites
    updatedCoordonnees.forEach((site, i) => {
      if (i > 0 && i < updatedCoordonnees.length - 1) {
        site.nom = `Site ${i}`;
      }
    });
    setCoordonnees(updatedCoordonnees);
    setNombreSites(newNombreSites);
  };

  // Fonction pour supprimer un site
  const handleDeleteSite = () => {
    if (coordonnees.length <= 2) return; // Ne rien faire s'il n'y a que les sites "Départ" et "Arrivée"
    const updatedCoordonnees = [...coordonnees];
    updatedCoordonnees.splice(updatedCoordonnees.length - 2, 1);
    setCoordonnees(updatedCoordonnees);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            margin: "10px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}> - Ajouter un voyage -</h2>
          <div
            style={{
              textAlign: "center",
              margin: "10px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Autocomplete
              id="pays"
              options={options} // Remplacer par pays
              getOptionLabel={(option) => option.label}
              value={pays}
              onChange={(event, newValue) => setPays(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Dans quel pays voyager ?" />
              )}
              sx={{ marginBottom: "10px" }}
            />
          </div>
        </div>

        {pays && (
          // Affichage des départs, arrivées et sites seuleument si un pays a été sélectionné
          <div>
            <p
              style={{
                margin: "20px",
              }}
            >
              Organise ton voyage
            </p>
            {coordonnees.map(({ nom, coordonnee }, index) => (
              <div key={index}>
                <CustomAutocomplete
                  coordonnee={coordonnees[index].coordonnee}
                  index={index}
                  nom={nom}
                  handleChange={(newValue, newIndex) =>
                    handleChange(newValue, newIndex)
                  }
                />
                {index === coordonnees.length - 2 && (
                  <div
                    style={{
                      margin: "auto",
                      maxWidth: "fit-content",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleIcon />}
                        onClick={handleAddSite}
                        style={{ width: "290px" }}
                      >
                        Ajouter un site à visiter
                      </Button>
                    </div>
                    {coordonnees.length > 2 && (
                      <div style={{ marginBottom: "10px" }}>
                        <Button
                          variant="outlined"
                          startIcon={<RemoveCircleIcon />}
                          onClick={handleDeleteSite}
                          color="error"
                          style={{ width: "290px" }}
                        >
                          Supprimer un site à visiter
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<DirectionsCarIcon />}
              >
                Calculer le trajet
              </Button>
            </div>
          </div>
        )}
      </form>
      {trajetPlusCourt.length > 0 && (
        <div>
          <h3>Trajet le plus court :</h3>
          <p>
            {trajetPlusCourt.map((etape, index) => (
              <span key={index}>
                {index === 0
                  ? etape.coordonnee
                  : `${etape.coordonnee} - ${etape.by}`}
                {index < trajetPlusCourt.length - 1 && " -> "}{" "}
              </span>
            ))}
            -&gt;{" "}
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

// Mise en forme du formulaire
export function CustomAutocomplete({ coordonnee, index, nom, handleChange }) {
  const selectedOption = options.find((option) => option.value === coordonnee);

  return (
    <div style={{ margin: "10px auto", maxWidth: "90%", textAlign: "center" }}>
      <Autocomplete
        disablePortal
        id={`autocomplete-${index}`}
        options={options}
        getOptionLabel={(option) => option.label}
        value={selectedOption || null}
        onChange={(event, newValue) =>
          handleChange(newValue ? newValue.value : "", index)
        }
        renderInput={(params) => <TextField {...params} label={`${nom}`} />}
      />
    </div>
  );
}

const options = [
  { label: "Classik Alexander Plaza Hotel", value: "13.40400,52.522000" },
  { label: "Aeroport", value: "13.24359,52.281499" },
  { label: "Porte de Brandebourg", value: "13.377957,52.516267" },
  { label: "Berliner Dom", value: "13.401078,52.519061" },
  { label: "Fernsehturm Berlin", value: "13.409419,52.520817" },
  { label: "Musée de la Stasi", value: "13.48583139,52.508664632" },
];
