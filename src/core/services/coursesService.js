import axios from "axios";

export const getTopSellCourses = async (page = 1, limit = 5) => {
  return await axios.post("/course/top-sell", {
    limit: limit,
    page: page,
  });
};

export const getTopNewCourses = async (page = 1, limit = 5) => {
  return await axios.post("/course/top-new", {
    limit: limit,
    page: page,
  });
};

export const getTopRateCourses = async (page = 1, limit = 5) => {
  return await axios.post("/course/top-rate", {
    limit: limit,
    page: page,
  });
};

export const getRecommendCourses = async (userId, limit = 5, offset = 1) => {
  return await axios.get(`/user/recommend-course/${userId}/${limit}/${offset}`);
};

export const getProcessCourses = async () => {
  return await axios.get("/user/get-process-courses");
};

export const getFavoriteCourses = async () => {
  return await axios.get("/user/get-favorite-courses");
};

export const likeCourses = async (courseId) => {
  return await axios.post("/user/like-course", {
    courseId: courseId,
  });
};

export const getCourseDetail = async (courseId) => {
  return await axios.get(`/course/detail-with-lesson/${courseId}`);
};

export const getCourseDetailSummary = async (courseId, userId) => {
  return await axios.get(`/course/get-course-detail/${courseId}/${userId}`);
};

export const getCourseInfo = async (courseId) => {
  return await axios.get(`/course/get-course-info?id=${courseId}`);
};

export const getCourseLikeStatus = async (courseId) => {
  return await axios.get(`/user/get-course-like-status/${courseId}`);
};

export const registerFreeCourse = async (courseId) => {
  return await axios.post(`/payment/get-free-courses`, {
    courseId: courseId,
  });
};

export const getCourseProcess = async (courseId) => {
  return await axios.get(`/course/process-course/${courseId}`);
};

export const searchCourse = async (keyword, page = 1, limit = 5) => {
  return await axios.post("/course/search", {
    keyword: keyword,
    limit: limit,
    offset: page - 1,
  });
};

export const getCategoryCourses = async (categoryId, page = 1, limit = 5) => {
  return await axios.post("/course/search", {
    keyword: "",
    limit: limit,
    offset: page - 1,
    opt: {
      sort: {
        attribute: "title",
        rule: "ASC",
      },
      category: [categoryId],
    },
  });
};

export const getLessonExercise = async (lessonId) => {
  return await axios.post(`/exercise/student/list-exercise-lesson`, {
    lessonId: lessonId,
  });
};

export const getExerciseQuestion = async (exerciseId) => {
  return await axios.post(`/exercise/student/exercise-test`, {
    exerciseId: exerciseId,
  });
};

export const ratingCourse = async (courseId, content, point) => {
  return await axios.post(`/course/rating-course`, {
    courseId: courseId,
    formalityPoint: point,
    contentPoint: point,
    presentationPoint: point,
    content: content,
  });
};
