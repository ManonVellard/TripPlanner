import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Accueil from "../Pages/Accueil";
import AjouterVoyage from "../Pages/AjouterVoyage";
import Voyages from "../Pages/Voyages";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Profil from "../Pages/Profil";

export function BottomBar() {
  const [value, setValue] = React.useState("acceuil");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, right: 0, left: 0 }}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Acceuil"
          value="acceuil"
          icon={<MapOutlinedIcon sx={{ color: "black" }} />}
          component={Link}
          to="/"
          sx={{ color: "red" }}
        />
        <BottomNavigationAction
          label="Ajouter"
          value="add"
          icon={<AddCircleIcon sx={{ fontSize: "50px", color: "red" }} />}
          component={Link}
          to="/add"
        />
        <BottomNavigationAction
          label="Mes voyages"
          value="voyages"
          icon={<LuggageOutlinedIcon sx={{ color: "black" }} />}
          component={Link}
          to="/voyages"
        />
      </BottomNavigation>
    </Paper>
  );
}

export function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "red" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TripPlanner
          </Typography>

          <div>
            <IconButton
              size="extralarge"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              label="Profil"
          value="profil"
          component={Link}
          to="/profil"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/add" element={<AjouterVoyage />} />
      <Route path="/voyages" element={<Voyages />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  );
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("https://localhost:7109/api/pays");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = countries.filter((country) =>
      country.nom.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 320,
        backgroundColor: "#f5f5f5",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher"
        inputProps={{ "aria-label": "Rechercher" }}
        value={searchTerm}
        onChange={handleSearch}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
