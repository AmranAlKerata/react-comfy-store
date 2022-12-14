import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  if (!isAuthenticated && !user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;
