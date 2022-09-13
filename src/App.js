import "./App.css";
import { useState } from "react";
import { Routes, Route, navigate } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import orca from "./components/orca.svg";
import { useAuthContext, AuthContextProvider } from "./context/AuthContext";
import {
  getUserContext,
  register,
  saveToLocalStorage,
  getFromLocalStorage,
} from "./utils/auth";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Navbar />
      {/* <img src={orca} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="secret"
          element={
            <ProtectedRoute>
              <div>Hello, welcome back {user?.username}</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
