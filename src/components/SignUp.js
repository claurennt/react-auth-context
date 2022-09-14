import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, saveToLocalStorage } from "../utils/auth";
import { handleFormData, validateForm } from "../utils/validateForm";
import { useAuthContext } from "../context/AuthContext";
import Alert from "./Alert";

const SignUp = () => {
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const { user, setUser, setAuthToken } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = validateForm(...Object.values(user));
    if (!isValid) return;

    const formData = handleFormData(user);

    try {
      const { headers, user: registeredUser } = await register(formData);

      const token = headers["x-authorization-token"];

      setUser(registeredUser);
      setAuthToken(token);
      saveToLocalStorage(token);

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setUser({ username: "", password: "", email: "" });
      setIsError(true);
      setAuthToken(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = (e) => {
    const [uploadedPicture] = e.target.files;
    setUser((prev) => ({ ...prev, [e.target.name]: uploadedPicture }));
  };

  //creates pic preview when a pic is selected
  const picPreview = user?.profile_pic && URL.createObjectURL(user.profile_pic);

  //makes the alert disappear after 3 seconds
  useEffect(() => {
    if (isError) {
      const errorTimerID = setTimeout(() => setIsError(false), 5000);
      return () => clearTimeout(errorTimerID);
    }
  }, [isError]);

  return (
    <>
      {isError && <Alert />}
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

            <div className="mx-auto w-64 text-center">
              <div className="relative w-64">
                <div
                  className={`w-64 h-64 group bg-blue-100 hover:bg-blue-200 ${
                    !user.profile_pic && "opacity-60"
                  }  rounded-full  flex justify-center items-center  transition duration-500`}
                >
                  {user.profile_pic && (
                    <img
                      src={picPreview}
                      alt="profile pic"
                      className="w-64 h-64 rounded-full"
                    />
                  )}

                  <input
                    required
                    name="profile_pic"
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleUploadPic}
                  />
                  <label htmlFor="file">
                    <img
                      className="w-8 cursor-pointer z-10 absolute bottom-8 right-5 opacity-50 group-hover:opacity-100 transition duration-500 text-white"
                      src="https://www.svgrepo.com/show/33565/upload.svg"
                      alt="upload"
                    />
                  </label>
                </div>
              </div>
            </div>
            <input
              required
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />

            <input
              required
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
    </>
  );
};

export default SignUp;
