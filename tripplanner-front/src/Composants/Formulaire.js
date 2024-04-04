import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculRoute } from "./CalculTrajet";
import AffichageSites from "./Trajet";
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastSite, setLastLocation] = useState(null);

  // Fonction appelée lorsqu'un champ de formulaire est modifié
  const handleChange = (newValue, index) => {
    setCoordonnees((prevCoordonnees) => {
      return prevCoordonnees.map((coord, i) => {
        if (i === index) {
          return { ...coord, coordonnee: newValue.coorGPS };
        }
        return coord;
      });
    });
  };

  // Fonction qui envoie le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pays) {
      alert("Veuillez sélectionner un pays");
      return;
    }
    const sitesSelectionnes = coordonnees
      .filter(
        (coordonnee) =>
          coordonnee.coordonnee !== "" && coordonnee.nom !== "Arrivée"
      )
      .map(({ coordonnee }) => coordonnee);
    const trajet = await calculRoute(sitesSelectionnes);
    setTrajetPlusCourt(trajet);
    const lastSiteResponse = await axios.get(
      `https://localhost:7109/api/site/byCoor/${
        coordonnees[coordonnees.length - 1].coordonnee
      }`
    );
    const lastSite = lastSiteResponse.data[0];
    console.log(lastSite);
    setLastLocation(lastSite);

    setFormSubmitted(true);
  };

  // Fonction pour ajouter un champ de formulaire pour un nouveau site
  const handleAddSite = () => {
    const newNombreSites = nombreSites + 1;
    const updatedCoordonnees = [
      ...coordonnees.slice(0, -1),
      { nom: `Site ${newNombreSites}`, coordonnee: "" },
      ...coordonnees.slice(-1), 
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
    if (coordonnees.length <= 2) return; 
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
            <CustomAutocompletePays setPays={setPays} />
          </div>
        </div>
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
              <CustomAutocompleteSite
                coordonnee={coordonnees[index].coordonnee}
                index={index}
                nom={nom}
                handleChange={handleChange}
                selectedPays={pays}
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
      </form>
      {formSubmitted && (
        <AffichageSites
          sitesAVisiter={trajetPlusCourt}
          lastLocation={lastSite}
        />
      )}
    </div>
  );
}

export function CustomAutocompleteSite({
  coordonnee,
  index,
  nom,
  handleChange,
  selectedPays,
}) {
  const [sites, setSites] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    async function fetchSites() {
      try {
        if (!selectedPays) return;
        const response = await axios.get(
          `https://localhost:7109/api/site/bypays/${selectedPays.id}`
        );
        setSites(response.data);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    }

    fetchSites();
  }, [selectedPays]);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
    handleChange(newValue, index);
  };

  const selectedOption = sites.find((site) => site.coorGPS === coordonnee);

  return (
    <div style={{ margin: "10px auto", maxWidth: "90%", textAlign: "center" }}>
      <Autocomplete
        disablePortal
        id={`autocomplete-${index}`}
        options={sites}
        getOptionLabel={(site) => site.nom}
        value={selectedValue || selectedOption || null}
        onChange={handleAutocompleteChange}
        renderInput={(params) => <TextField {...params} label={`${nom}`} />}
      />
    </div>
  );
}

export function CustomAutocompletePays({ setPays }) {
  const [paysOptions, setPaysOptions] = useState([]);
  const [selectedPays, setSelectedPays] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7109/api/pays")
      .then((response) => {
        setPaysOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pays:", error);
      });
  }, []);

  return (
    <Autocomplete
      id="pays-autocomplete"
      options={paysOptions}
      getOptionLabel={(pays) => pays.nom}
      value={selectedPays}
      onChange={(event, newValue) => {
        setSelectedPays(newValue);
        setPays(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Sélectionner un pays" />
      )}
    />
  );
}
