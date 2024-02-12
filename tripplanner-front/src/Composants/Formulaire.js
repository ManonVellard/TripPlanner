import React, { useState } from "react";
import "../Fonctions/Fonctions";
import { calculRoute } from "../Fonctions/Fonctions";

function Formulaire() {
  // États pour stocker les valeurs sélectionnées
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  // Fonction pour gérer le changement de valeur de la première liste déroulante
  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  // Fonction pour gérer le changement de valeur de la deuxième liste déroulante
  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  // Fonction pour gérer le changement de valeur de la troisième liste déroulante
  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };


  return (
    <form onSubmit={calculRoute}>
      <div>
        <label>
          Option 1 :
          <select value={option1} onChange={handleOption1Change}>
            <option value="">Sélectionnez une option</option>
            <option value="13.388860,52.517037">13.388860,52.517037</option>
            <option value="option1B">Option 1B</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Option 2 :
          <select value={option2} onChange={handleOption2Change}>
            <option value="">Sélectionnez une option</option>
            <option value="13.385983,52.496891">13.385983,52.496891</option>
            <option value="option2B">Option 2B</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Option 3 :
          <select value={option3} onChange={handleOption3Change}>
            <option value="">Sélectionnez une option</option>
            <option value="13.385983,52.496891">13.385983,52.496891</option>
            <option value="option3B">Option 3B</option>
          </select>
        </label>
      </div>
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default Formulaire;
