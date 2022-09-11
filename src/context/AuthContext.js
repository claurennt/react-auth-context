import { createContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const AuthContext = createContext();

const AuthContextProvider = ({ isLoggedIn }) => {
  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {isLoggedIn ? <Outlet /> : <Navigate to='/login' />}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
