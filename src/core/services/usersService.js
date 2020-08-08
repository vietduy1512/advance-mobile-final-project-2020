import axios from "axios";

export const getUserInfo = async () => {
  return await axios.get("/user/get-favorite-courses");
};

export const forgotPassword = async (email) => {
  return await axios.post("/user/forget-pass/send-email", {
    email: email
  });
};
