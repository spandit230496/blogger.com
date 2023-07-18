import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  return userId ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
