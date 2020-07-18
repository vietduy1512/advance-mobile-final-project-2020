import axios from 'axios';

export const getTopSellCourses = async (page = 1, limit = 10) => {
  return await axios.post('https://api.itedu.me/course/top-sell', {
    "limit": limit,
    "page": page
  });
}

export const getCourseDetail = async (courseId) => {
  return await axios.get(`https://api.itedu.me/course/detail-with-lesson/${courseId}`);
}