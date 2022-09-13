import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Home = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  console.log(user);
  return (
    <div>
      <h1>Welcome to my amazing website {user?.username}</h1>
    </div>
  );
};

export default Home;
