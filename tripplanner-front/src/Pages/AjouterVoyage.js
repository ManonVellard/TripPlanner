import React from "react";
import Formulaire from "../Composants/Formulaire";

//data.routes[0].distance
//data.routes[0].duration
//<button onClick={() => calculRoute()}>requete</button>

//13.40400,52.522000 (Classik Alexander Plaza Hotel) ; 13.24359,52.281499(Aeroport) ; 13.377957,52.516267 (Porte de Brandebourg) ;13.401078,52.519061(Berliner Dom) ; 13.409419,52.520817 (Fernsehturm Berlin) ; 13.48583139,52.508664632 (Musée de la Stasi)

function AjouterVoyage() {
  return (
    <div>
      <Formulaire />
    </div>
  );
}

export default AjouterVoyage;
