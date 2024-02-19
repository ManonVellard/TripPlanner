import React from "react";
import "../CSS/App.css";
import Formulaire from "../Composants/Formulaire";

//Coordonnées Berlin : 13.388860,52.517037 ; 13.385983,52.496891 ; 13.377957,52.516267 ; 13.401078,52.519061 ; 13.409419,52.520817
//data.routes[0].distance
//data.routes[0].duration
//<button onClick={() => calculRoute()}>requete</button>

function App() {
  return (
    <div>
      <p>
      13.40400,52.522000 (Classik Alexander Plaza Hotel) ; 13.24359,52.281499 (Aeroport) ; 13.377957,52.516267 (Porte de Brandebourg) ;
        13.401078,52.519061(Berliner Dom) ; 13.409419,52.520817 (Fernsehturm Berlin) ; 13.48583139,52.508664632 (Musée de la Stasi)
      </p>
      <Formulaire />
    </div>
  );
}

export default App;
