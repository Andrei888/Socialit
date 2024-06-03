import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";

// constants
import appRoutes from "@constants/routes";
import { defaultTheme } from "./core/theme";

// redux
import {
  useInjectLogin,
  useInjectFriends,
  useInjectGroups,
  useInjectGroupDetails,
  useInjectMessages,
  useInjectProfile,
} from "@hooks/inject";
import { useInitUser } from "@hooks/init";

// components
import GlobalLoader from "@features/globalLoading/GlobalLoader";
import PublicRoute from "./components/common/routes/PublicRoute";
import PrivateRoute from "./components/common/routes/PrivateRoute";
import LoginPage from "@features/login/LoginPage";

//pages
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import MyFriends from "./pages/MyFriends";
import MyGroups from "./pages/MyGroups";
import NewGroup from "./pages/NewGroup";
import Messages from "./pages/Messages";
import LatestMessages from "./pages/LatestMessages";
import Group from "./pages/Group";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";

const headerContent = (
  <>
    <Helmet titleTemplate="Social IT" defaultTitle="Social IT">
      <meta name="description" content="Aplicatie de socializare" />
    </Helmet>
    <ToastContainer autoClose={3000} position="top-right" theme="light" />
    <GlobalLoader />
  </>
);

const useInit = () => {
  useInitUser();
};

function App() {
  useInjectLogin();
  useInjectFriends();
  useInjectProfile();
  useInjectGroups();
  useInjectGroupDetails();
  useInjectMessages();
  useInit();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        {headerContent}
        <Switch>
          <PublicRoute path={appRoutes.login} component={LoginPage} />
          <PrivateRoute path={appRoutes.friends} component={MyFriends} />
          <PrivateRoute path={appRoutes.about} component={AboutUs} />
          <PrivateRoute path={appRoutes.userProfile} component={UserProfile} />
          <PrivateRoute path={appRoutes.profile} component={Profile} />
          <PrivateRoute path={appRoutes.groups} component={MyGroups} />
          <PrivateRoute path={appRoutes.newGroup} component={NewGroup} />
          <PrivateRoute path={appRoutes.group} component={Group} />
          <PrivateRoute path={appRoutes.messages} component={Messages} />
          <PrivateRoute
            path={appRoutes.latestMessages}
            component={LatestMessages}
          />
          <PrivateRoute path={appRoutes.faq} component={FAQ} />
          <PrivateRoute path={appRoutes.contactUs} component={ContactUs} />
          <PrivateRoute path={appRoutes.home} component={Home} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
