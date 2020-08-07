import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "./types";
import { AsyncStorage } from "react-native";
import { apiLogin } from "core/services/authenticationService";

export const login = (dispatch) => async (email, password) => {
  try {
    const response = await apiLogin(email, password);
    await AsyncStorage.setItem("access_token", response.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: LOGIN_FAILED,
        errorMessage: error.response.data.message,
      });
    } else {
      dispatch({ type: LOGIN_FAILED, errorMessage: "Something went wrong!" });
    }
  }
};

// Not implemented yet
export const register = (dispatch) => async (email, password) => {
  return { dispatch, email, password };
};

export const logout = (dispatch) => async () => {
  dispatch({
    type: LOGOUT,
  });
};
