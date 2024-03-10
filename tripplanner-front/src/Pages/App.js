import { BottomBar, AppRoutes, MenuAppBar } from "../Composants/Squelette";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MenuAppBar />
      <AppRoutes />
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;