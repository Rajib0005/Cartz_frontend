import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        isAuthenticated ? children : <Navigate to="/login" replace />
      )}
    </Fragment>

  );
};

export default ProtectedRoute;