import './App.css';
import { useState } from 'react';
import { Routes, Route, navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import orca from './components/orca.svg';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import {
  register,
  saveToLocalStorage,
  getFromLocalStorage,
} from './utils/authUtils';

function App() {
  const token = getFromLocalStorage();

  const [user, setUser] = useState({ username: '', password: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(token);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { headers, username } = await register(user);

    setIsLoggedIn(true);

    setAuthToken(headers['x-authorization-token']);
    saveToLocalStorage(headers['x-authorization-token']);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='App'>
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <img src={orca} /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='signup'
          element={
            <SignUp
              isAuthenticated={isLoggedIn}
              user={user}
              handleChange={handleChange}
              handleRegister={handleRegister}
            />
          }
        />
        <Route path='login' element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path='secret'
          element={<AuthContextProvider isLoggedIn={isLoggedIn} />}
        >
          <Route
            index
            element={<div>Hello, welcome back {user.username}</div>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
