import React from "react";

import { Route, RouteProps } from "react-router-dom";

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
          <Component {...props} />
        </>
      )}
    />
  );
};

export default PublicRoute;
