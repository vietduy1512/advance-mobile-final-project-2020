import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get('https://api.itedu.me/category/all');
}
