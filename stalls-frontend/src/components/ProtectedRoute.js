import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (allowedRole && payload.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;