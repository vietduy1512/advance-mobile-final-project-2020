import axios from "axios";

export const forgotPassword = async (email) => {
  return await axios.post("/user/forget-pass/send-email", {
    email: email,
  });
};

export const getUserInfo = async () => {
  return await axios.get("/user/me");
};

export const updateUserInfo = async (name, avatar, phone) => {
  return await axios.put("/user/update-profile", {
    name: name,
    avatar: avatar,
    phone: phone,
  });
};
