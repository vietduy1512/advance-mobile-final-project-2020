import axios from "axios";

export const getAuthorDetail = async (instructorId) => {
  return await axios.get(
    `https://api.itedu.me/instructor/detail/${instructorId}`
  );
};

export const getAllAuthors = async () => {
  return await axios.get(`https://api.itedu.me/instructor`);
};
