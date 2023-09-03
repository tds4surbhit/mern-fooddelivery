import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Carousal from "../components/Carousal";

function Home() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div>
        <Carousal />
      </div>

      <div>
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
