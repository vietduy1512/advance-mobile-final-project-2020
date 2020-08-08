import axios from "axios";

export const getTopSellCourses = async (page = 1, limit = 10) => {
  return await axios.post("/course/top-sell", {
    limit: limit,
    page: page,
  });
};

export const getCourseDetail = async (courseId) => {
  return await axios.get(
    `/course/detail-with-lesson/${courseId}`
  );
};

export const getCourseDetailSummary = async (courseId, userId) => {
  return await axios.get(
    `/course/get-course-detail/${courseId}/${userId}`
  );
};

export const getFavoriteCourses = async () => {
  return await axios.get("/user/get-favorite-courses");
};

export const likeCourses = async (courseId) => {
  return await axios.post("/user/like-course", {
    courseId: courseId,
  });
};

export const getCourseLikeStatus = async (courseId) => {
  return await axios.get(
    `/user/get-course-like-status/${courseId}`
  );
};

export const searchCourse = async (keyword, limit = 10, offset = 0) => {
  return await axios.post("/course/search", {
    keyword: keyword,
    limit: limit,
    offset: offset,
  });
};
