import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

// constants
import appRoutes from "@constants/routes";
import { defaultTheme } from "./core/theme";

// components
import GlobalLoader from "@features/globalLoading/GlobalLoader";
import PublicRoute from "./components/common/routes/PublicRoute";
import PrivateRoute from "./components/common/routes/PrivateRoute";
import LoginPage from "@features/login/LoginPage";

const headerContent = (
  <>
    {/* <Helmet titleTemplate="Social IT" defaultTitle="Social IT" >
    <meta name="description" content="Aplicatie de socializare" />
  </Helmet> */}
    <ToastContainer autoClose={3000} position="top-right" theme="light" />
    <GlobalLoader />
  </>
);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        {headerContent}
        <Switch>
          <PublicRoute path={appRoutes.login} component={LoginPage} />
          <PrivateRoute path={appRoutes.home} component={LoginPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
