import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

export default function AffichageSites({ sitesAVisiter, lastLocation }) {
  const [sitesInfo, setSitesInfo] = useState([]);
  const [openStates, setOpenStates] = useState([]);
  const [lastLocationOpen, setLastLocationOpen] = useState(false);

  useEffect(() => {
    async function fetchSitesInfo() {
      try {
        const info = await getSitesInfo(sitesAVisiter);
        setSitesInfo(info);
        setOpenStates(new Array(info.length).fill(false));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations des sites :",
          error
        );
      }
    }
    fetchSitesInfo();
  }, [sitesAVisiter]);

  async function getSitesInfo(sites) {
    const sitesInfo = await Promise.all(
      sites.map(async (site) => {
        try {
          const response = await axios.get(
            `https://localhost:7109/api/site/byCoor/${site.coordonnee}`
          );

          const lieu = response.data[0];
          return {
            nom: lieu.nom,
            moyenTransport: site.by,
            dureeVisite: lieu.dureeVisite, // Ajoutez ces propriétés
            type: lieu.type,
            horaireOuv: lieu.horaireOuv,
            horaireFer: lieu.horaireFer,
          };
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des informations du site :",
            error
          );
          return {
            nom: "Nom du site non trouvé",
            moyenTransport: "Moyen de transport non spécifié",
          };
        }
      })
    );
    return sitesInfo;
  }

  const toggleOpenState = (index) => {
    setOpenStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const toggleLastLocationOpen = () => {
    setLastLocationOpen((prevState) => !prevState);
  };

  /*const handleClick = () => {
    creerVoyage(sitesAVisiter, lastLocation);
  };*/

  return (
    <div>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        {" "}
        - Trajet proposé -
      </h2>
      <List sx={style} aria-label="sites list">
        {sitesInfo.map((site, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => toggleOpenState(index)}>
              <ListItemText
                primary={site.nom}
                secondary={`Transport: ${site.moyenTransport}`}
              />
              {openStates[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText
                  secondary={`Type: ${site.type}`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Durée de visite: ${site.dureeVisite}h`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Horaires d'ouverture: ${site.horaireOuv}h - ${site.horaireFer}h`}
                  sx={{ margin: "18px" }}
                />
              </List>
            </Collapse>
            {index < sitesInfo.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
        {lastLocation && (
          <React.Fragment>
            <Divider component="li" />
            <ListItemButton onClick={toggleLastLocationOpen}>
              <ListItemText
                primary={lastLocation.nom}
                secondary={"Transport: en voiture"}
              />
              {lastLocationOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={lastLocationOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText
                  secondary={`Type: ${lastLocation.type}`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Temps de visite conseillé : ${lastLocation.dureeVisite}h`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Horaires d'ouverture : ${lastLocation.horaireOuv}h - ${lastLocation.horaireFer}h`}
                  sx={{ margin: "18px" }}
                />
              </List>
            </Collapse>
          </React.Fragment>
        )}
      </List>
      <div>
        <p /*onClick={handleClick}*/>Ajouter à Mes voyages</p>
      </div>
    </div>
  );
}

export async function creerVoyage(coordonnees, lastLocalisation) {
  try {
    coordonnees.push(lastLocalisation);
    let sites = [];
    for (const coordonnee of coordonnees) {
      const response = await axios.get(
        `https://localhost:7109/api/site/byCoor/${coordonnee}`
      );

      sites = sites.concat(response.data);
    }

    const voyageResponse = await axios.post(
      "https://localhost:7109/api/voyage",
      {
        id: 1,
        sitesVisites: sites,
        idUtilisateur: 1,
        moyensTransports: ["string"],
      }
    );

    // Vérifiez si la requête a réussi
    if (voyageResponse.status === 200) {
      console.log("Voyage créé avec succès");
    } else {
      console.error("Erreur lors de la création du voyage");
    }
  } catch (error) {
    console.error("Erreur lors de la création du voyage :", error);
  }
}

const style = {
  p: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
  margin: "7%",
};
