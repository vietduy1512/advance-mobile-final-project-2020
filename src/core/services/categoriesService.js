import axios from "axios";

export const getAllCategories = async () => {
  return await axios.get("/category/all");
};
