import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";
import JWTStore from "../../../storage/localStorage/jwtStorage";

import appRoutes from "@constants/routes";

interface PublicRouteInt extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PublicRoute: React.FC<PublicRouteInt> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!JWTStore.exists() && <Component {...props} />}
          {JWTStore.exists() && (
            <Redirect
              to={{ pathname: appRoutes.home, state: { from: props.location } }}
            />
          )}
        </>
      )}
    />
  );
};

export default PublicRoute;
