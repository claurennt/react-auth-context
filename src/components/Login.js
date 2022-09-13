import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveToLocalStorage, getUserContext } from "../utils/auth";
import { useAuthContext } from "../context/AuthContext";
const Login = () => {
  const { user, setUser, setAuthToken } = useAuthContext();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = user;

      const { headers } = await login({ username, password });

      const token = headers["x-authorization-token"];

      if (token) {
        const userContext = await getUserContext(token);

        setUser(userContext);
        setAuthToken(token);
        saveToLocalStorage(token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setUser({ username: "", password: "", email: "" });
      setIsError(true);
      setAuthToken(null);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              onChange={handleChange}
              type="text"
              className={`block border ${
                isError ? "border-rose-600" : "border-grey-light"
              } w-full p-3 rounded mb-4`}
              name="username"
              placeholder="Username"
              value={user.username}
            />

            <input
              onChange={handleChange}
              type="password"
              className={`block border  ${
                isError ? "border-rose-600" : "border-grey-light"
              } w-full p-3 rounded mb-4`}
              name="password"
              placeholder="Password"
              value={user.password}
            />
            {isError && !user.password && !user.username && (
              <span className="text-rose-600">
                Invalid credentials - please double check username/password
              </span>
            )}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
