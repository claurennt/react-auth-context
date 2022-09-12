import React from "react";
import { useNavigate } from "react-router-dom";
import { login, saveToLocalStorage } from "../utils/authUtils";
import { useAuthContext } from "../context/AuthContext";
const Login = () => {
  const { user, setUser, setAuthToken } = useAuthContext();

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { headers } = await login(user);

    setAuthToken(headers["x-authorization-token"]);
    saveToLocalStorage(headers["x-authorization-token"]);
    navigate("/secret", { replace: true });
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            onChange={handleChange}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={user.username}
          />

          <input
            onChange={handleChange}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={user.password}
          />

          <button
            onClick={handleLogin}
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
