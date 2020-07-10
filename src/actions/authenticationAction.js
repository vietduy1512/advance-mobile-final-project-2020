import {LOGIN_SUCCESS, LOGIN_FAILED} from './types';
import axios from 'axios';

//export const login = () => async dispatch => {
export const login = (dispatch) => async (email, password) => {
  try {
    const response = await axios.post('https://api.itedu.me/user/login', {
      // TODO: Replace data
      email: "nglethimylinh@gmail.com",
      password: "123456789"
    });

    if (response.status === 200) {
      console.log(response.data);
      dispatch({
        type: LOGIN_SUCCESS,
        data: response.data,
      });
    } else {
      dispatch({type: LOGIN_FAILED, errorMessage: 'Something went wrong!'});
    }
  } catch (error) {
    dispatch({type: LOGIN_FAILED, errorMessage: 'Something went wrong!'});
  }
};

export const register = (dispatch) => async (email, password) => {
  // Not implemented
}
