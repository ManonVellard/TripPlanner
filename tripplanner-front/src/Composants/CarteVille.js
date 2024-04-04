import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";

export default function MultiActionAreaCard() {
  const [pays, setPays] = React.useState([]);

  React.useEffect(() => {
    async function fetchPays() {
      try {
        const response = await axios.get("https://localhost:7109/api/pays");
        const paysWithSites = await Promise.all(
          response.data.map(async (pays) => {
            const nombreSites = await getNombreSites(pays.id);
            return { ...pays, nombreSites };
          })
        );
        setPays(paysWithSites);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des pays :",
          error
        );
      }
    }
    fetchPays();
  }, []);

  async function getNombreSites(idPays) {
    try {
      const response = await axios.get(
        `https://localhost:7109/api/site/bypays/${idPays}`
      );
      return response.data.length; 
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de sites pour le pays donné :",
        error
      );
      return 0;
    }
  }

  return (
    <div>
      {pays.map((pays) => (
        <Card
          key={pays.id}
          sx={{
            maxWidth: 300,
            width: "100%",
            marginBottom: "10px",
            marginLeft: "58px",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pays.nom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pays.nombreSites} site(s) touristique(s)
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Voir plus
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
