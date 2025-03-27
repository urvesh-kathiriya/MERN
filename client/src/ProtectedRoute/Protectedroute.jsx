import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";

const Protectedroute = ({ children }) => {
  const { isLoggin } = useContext(AuthContext);
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoggin) {
      navigate("/login");
    }
  }, [isLoggin, isAuthenticated, navigate]);

  return children ? children : <Outlet />;
};

export default Protectedroute;
