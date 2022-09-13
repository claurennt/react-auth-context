import axios from "axios";

const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const register = async (userData) => {
  console.log(userData);
  const {
    status,
    headers,
    data,
    data: {
      userRegistrationData: [user],
    },
  } = await axios.post(`http://localhost:3001/users/register`, userData);
  console.log(data);
  if (status !== 201) {
    return alert("Something went wrong");
  }
  return { headers, user };
};

const login = async (userData) => {
  const { status, headers, data } = await axios.post(
    `http://localhost:3001/auth/login`,
    userData
  );

  if (status !== 200) {
    return alert("Something went wrong");
  }
  return { headers };
};

const getUserContext = async (token) => {
  try {
    const { status, data } = await axios.get(
      `http://localhost:3001/users/me`,

      { headers: { authorization: `Bearer ${token}` } }
    );

    if (status !== 200) {
      return alert("Something went wrong");
    }

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
