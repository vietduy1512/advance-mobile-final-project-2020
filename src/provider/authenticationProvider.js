
import React, {useReducer} from 'react';
import {AuthenticationContext} from 'context';
import reducer from 'reducers/authenticationReducer';
import {login, register} from 'actions/authenticationAction';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  token: null
}

const AuthenticationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthenticationContext.Provider value={{state, login: login(dispatch), register: register(dispatch)}}>
    {props.children}
  </AuthenticationContext.Provider>
}

export default AuthenticationProvider;