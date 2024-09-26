import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { Context } from "./Provider";

const AuthRoute = ({ component: Component, roles, ...rest }) => {
  const { currentUser } = useContext(Context);
  console.log(currentUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return <Redirect to="/welcome" />;
        }

        if (!currentUser?.authenticated) {
          return <Redirect to="/welcome" />;
        }

        if (!roles.includes(currentUser?.role)) {
          return <Redirect to="/welcome" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default AuthRoute;
