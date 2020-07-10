import {LOGIN_SUCCESS, LOGIN_FAILED} from './types';
import axios from 'axios';

import {apiLogin} from 'core/services/authenticationService';

//export const login = () => async dispatch => {
export const login = (dispatch) => async (email, password) => {
  try {
    const response = await apiLogin(email, password);
    if (response.status === 200) {
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
