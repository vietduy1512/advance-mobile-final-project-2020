import {LOGIN_SUCCESS, LOGIN_FAILED} from 'actions/types';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
  errorMessage: ''
}


export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.data.userInfo,
        token: action.data.token,
        errorMessage: ''
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}
