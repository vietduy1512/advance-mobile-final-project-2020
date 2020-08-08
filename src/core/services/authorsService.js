import axios from "axios";

export const getAuthorDetail = async (instructorId) => {
  return await axios.get(
    `/instructor/detail/${instructorId}`
  );
};

export const getAllAuthors = async () => {
  return await axios.get(`/instructor`);
};
