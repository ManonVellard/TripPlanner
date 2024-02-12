import React from "react";
import "../CSS/App.css";
import Formulaire from "../Composants/Formulaire";
import { calculRoute } from "../Fonctions/Fonctions";

//13.388860,52.517037;13.385983,52.496891
//data.routes[0].distance
//data.routes[0].duration
//<button onClick={() => calculRoute()}>requete</button>


function App() {
  return (
    <div>
      <Formulaire />
    </div>
  );
}

export default App;
