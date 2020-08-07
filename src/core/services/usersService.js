import axios from "axios";

export const getUserInfo = async () => {
  return await axios.get("https://api.itedu.me/user/get-favorite-courses");
};
