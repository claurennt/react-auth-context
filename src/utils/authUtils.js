import axios from "axios";

const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const register = async (userData) => {
  const {
    status,
    headers,
    data: {
      userRegistrationData: [{ username }],
    },
  } = await axios.post(`${REACT_APP_DEV_API_URL}/users/register`, userData);

  if (status !== 201) {
    return alert("Something went wrong");
  }
  return { headers, username };
};

const login = async (userData) => {
  const {
    status,
    headers,
    data: {
      user: { username },
    },
  } = await axios.post(`${REACT_APP_DEV_API_URL}/auth/login`, userData);

  if (status !== 200) {
    return alert("Something went wrong");
  }
  return { headers, username };
};

const saveToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

const getFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || null;
};

const removeFromLocalStorage = () => {
  console.log("here");
  localStorage.removeItem("token");
};

export {
  register,
  login,
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
};
