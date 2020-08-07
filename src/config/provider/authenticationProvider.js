
import React, {useReducer} from 'react';
import {AuthenticationContext} from 'config/context';
import reducer from 'core/reducers/authenticationReducer';
import {login, register, logout} from 'core/actions/authenticationAction';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  token: null
}

const AuthenticationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthenticationContext.Provider value={{state, login: login(dispatch), register: register(dispatch), logout: logout(dispatch)}}>
    {props.children}
  </AuthenticationContext.Provider>
}

export default AuthenticationProvider;
