import React from "react";
//constants
//import { ROUTES } from "../constants/routes";
//components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { Styled } from "./Main.styled";

interface MainInterface {
  component: React.ComponentType;
}
const Main: React.FC<MainInterface> = ({ component: Component, ...rest }) => {
  return (
    <div className="social-app">
      <header className="App-header">
        <Header />
      </header>
      <Styled.Main className="main">
        <Styled.Container>
          <Component {...rest} />
        </Styled.Container>
      </Styled.Main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
