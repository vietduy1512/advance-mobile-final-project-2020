import axios from 'axios';

export const apiLogin = async (email, password) => {
  return await axios.post('https://api.itedu.me/user/login', {
    // TODO: Replace data
    email: "nglethimylinh@gmail.com",
    password: "123456789"
  });
}