import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

//Récupération des voyages dans la base de données impossible, page codée à la main
function Voyages() {
  const [openStates, setOpenStates] = useState([false, false, false]);

  const toggleOpenState = (index) => {
    setOpenStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div style={{ height: "150vh", overflowY: "scroll" }}>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        - Mes voyages -
      </h2>
      <h3>France</h3>
      <List aria-label="sites list">
        {[
          { nom: "Tour Eiffel" },
          { nom: "Musée du Louvre" },
          { nom: "Notre Dame de Paris" },
        ].map((site, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => toggleOpenState(index)}>
              <ListItemText primary={site.nom} secondary={`Transport: `} />
              {openStates[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText
                  secondary={`Type: Type du site`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Durée de visite: Durée`}
                  sx={{ margin: "18px" }}
                />
                <ListItemText
                  secondary={`Horaires d'ouverture: Horaires`}
                  sx={{ margin: "18px" }}
                />
              </List>
            </Collapse>
            {index < 2 && <Divider component="li" />}{" "}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Voyages;
