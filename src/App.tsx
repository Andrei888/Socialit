import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

// constants
import appRoutes from "@constants/routes";
import { defaultTheme } from "./core/theme";

// redux
import { useInjectLogin } from "@hooks/inject";
import { useInitUser } from "@hooks/init";

// components
import GlobalLoader from "@features/globalLoading/GlobalLoader";
import PublicRoute from "./components/common/routes/PublicRoute";
import PrivateRoute from "./components/common/routes/PrivateRoute";
import LoginPage from "@features/login/LoginPage";
import Main from "./pages/Main";

//pages
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const headerContent = (
  <>
    {/* <Helmet titleTemplate="Social IT" defaultTitle="Social IT" >
    <meta name="description" content="Aplicatie de socializare" />
  </Helmet> */}
    <ToastContainer autoClose={3000} position="top-right" theme="light" />
    <GlobalLoader />
  </>
);

const useInit = () => {
  useInitUser();
};

function App() {
  useInjectLogin();
  useInit();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        {headerContent}
        <Switch>
          <PublicRoute path={appRoutes.login} component={LoginPage} />
          <PrivateRoute path={appRoutes.about} component={AboutUs} />
          <PrivateRoute path={appRoutes.profile} component={Profile} />
          <PrivateRoute path={appRoutes.home} component={Home} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
