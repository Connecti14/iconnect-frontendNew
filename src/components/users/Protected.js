// Protected.js
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!userData); // Set isLoggedIn based on whether user data exists
  }, []);

  if (!isLoggedIn) {
    navigate("/login"); // Redirect to the login page if not authenticated
    return null;
  }

  return children; // Render nested child routes
};

export default Protected;
