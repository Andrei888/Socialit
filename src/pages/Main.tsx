import React from "react";
//constants
//import { ROUTES } from "../constants/routes";
//components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Main: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
