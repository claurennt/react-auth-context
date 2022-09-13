import React from "react";
import { useAuthContext } from "../context/AuthContext";
const Home = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>
      <h1>Welcome to my amazing website {user?.username}</h1>
    </div>
  );
};

export default Home;
