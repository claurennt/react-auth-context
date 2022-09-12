import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuthContext();
  const navigate = useNavigate();
  return authToken ? children : navigate("/login");
};

export default ProtectedRoute;
