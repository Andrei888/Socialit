import React from "react";

import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

// Main Sections
import Main from "@app/pages/Main";
// utils
import JWTStore from "../../../storage/localStorage/jwtStorage";
// redux
import { getUserDetails } from "@features/login/redux/selectors";

import appRoutes from "@constants/routes";

// components
import DisabledPage from "./DisabledPage";

interface PrivateRouteInt extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteInt> = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(getUserDetails);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {user.isDisabled && <DisabledPage />}
          {!user.isDisabled && JWTStore.exists() && (
            <Main component={Component} />
          )}
          {!JWTStore.exists() && (
            <Redirect
              to={{
                pathname: appRoutes.login,
                state: { from: props.location },
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default PrivateRoute;
