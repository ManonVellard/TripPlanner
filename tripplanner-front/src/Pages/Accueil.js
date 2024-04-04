import React from "react";
import { SearchBar } from "../Composants/Squelette";
import MultiActionAreaCard from "../Composants/CarteVille";

function Accueil() {
  return (
    <div style={{ height: "150vh", overflowY: "scroll" }}>
      <img
        src="https://img.freepik.com/vecteurs-libre/background-design-mappemonde_1127-2318.jpg?w=900&t=st=1710227776~exp=1710228376~hmac=d54b99dc2cd921ba84a8d3d361b0e604335b3c734287ac80ff0648421d22c806"
        alt="Carte du monde"
        style={{ width: "95%", margin: "auto", display: "block" }}
      />
      <p style={{ marginLeft: "42px" }}>Où voyager ?</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <SearchBar />
      </div>
      <div style={{ justifyContent: "center" }}>
        <MultiActionAreaCard />
      </div>
    </div>
  );
}

export default Accueil;
