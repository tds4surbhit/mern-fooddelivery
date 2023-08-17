import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div>
      <div>
        <NavBar />
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
