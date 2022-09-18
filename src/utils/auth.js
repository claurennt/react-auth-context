import axios from "axios";

const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const register = async (userData) => {
  const {
    headers,
    data: {
      userRegistrationData: [user],
    },
  } = await axios.post(`http://localhost:3001/users/register`, userData);

  return { headers, user };
};

const login = async (userData) => {
  const { headers } = await axios.post(
    `${REACT_APP_PROD_API_URL}/auth/login`,
    userData
  );

  return { headers };
};

const getUserContext = async (token) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_PROD_API_URL}/users/me`,

      { headers: { authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (err) {
    removeFromLocalStorage();
    console.log(err);
  }
};

const saveToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

const getFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || null;
};

const removeFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export {
  register,
  login,
  getUserContext,
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
};
