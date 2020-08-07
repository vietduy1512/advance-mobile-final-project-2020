import axios from "axios";

export const apiLogin = async (email, password) => {
  return await axios.post("https://api.itedu.me/user/login", {
    // email: "nglethimylinh@gmail.com",
    // password: "123456789"
    email: email,
    password: password,
  });
};

export const apiRegister = async ({ username, email, phone, password }) => {
  return await axios.post("https://api.itedu.me/user/register", {
    username: username,
    email: email,
    phone: phone,
    password: password,
  });
};
