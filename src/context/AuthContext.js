import { createContext, useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getFromLocalStorage } from "../utils/authUtils";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // get token from local storage if exists
  const token = getFromLocalStorage();

  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const [authToken, setAuthToken] = useState(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };
