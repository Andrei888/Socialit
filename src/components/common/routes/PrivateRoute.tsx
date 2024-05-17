import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";
import JWTStore from "../../../storage/localStorage/jwtStorage";

import appRoutes from "@constants/routes";

interface PrivateRouteInt extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteInt> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {JWTStore.exists() && <Component {...props} />}
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
