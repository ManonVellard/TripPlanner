import React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Accueil from "../Pages/Accueil";
import AjouterVoyage from "../Pages/AjouterVoyage";
import Voyages from "../Pages/Voyages";

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
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
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
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
    </Routes>
  );
}
