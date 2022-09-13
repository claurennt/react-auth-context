import React from "react";
import { useNavigate } from "react-router-dom";
import { register, saveToLocalStorage } from "../utils/auth";
import { useAuthContext } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();

  const { user, setUser, setAuthToken } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const { username, password, profile_pic, email } = user;
    formData.append("profile_pic", profile_pic);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    const { headers, user: registereduser } = await register(formData);
    const token = headers["x-authorization-token"];
    setAuthToken(token);
    saveToLocalStorage(token);
    // navigate("/secret", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = (e) => {
    const uploadedPicture = e.target.files[0];
    setUser((prev) => ({ ...prev, [e.target.name]: uploadedPicture }));
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <div className="mx-auto w-64 text-center">
            <div className="relative w-64">
              <div className="w-64 h-64 group bg-blue-100 hover:bg-blue-200 opacity-60 rounded-full  flex justify-center items-center  transition duration-500">
                <input
                  name="profile_pic"
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleUploadPic}
                />
                <label htmlFor="file">
                  <img
                    className="w-12 cursor-pointer "
                    src="https://www.svgrepo.com/show/33565/upload.svg"
                    alt="upload"
                  />
                </label>
              </div>
            </div>
          </div>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />

          <button
            onClick={handleRegister}
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
