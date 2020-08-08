import axios from "axios";

export const getUserInfo = async () => {
  return await axios.get("https://api.itedu.me/user/get-favorite-courses");
};

export const forgotPassword = async (email) => {
  return await axios.post("https://api.itedu.me/user/forget-pass/send-email", {
    email: email
  });
};
