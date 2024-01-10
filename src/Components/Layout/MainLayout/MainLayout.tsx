import React, { useState } from "react";
import MainRoute from "../../Routing/MainRoute/MainRoute";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import YouTube from "../YouTube/YouTube";
import "./MainLayout.css";
import Menu from "../Menu/Menu";

function MainLayout(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="MainLayout">
      <header>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </header>
      <aside>
        <Menu open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </aside>
      <main>
        <MainRoute />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
