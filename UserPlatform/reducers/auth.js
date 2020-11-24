import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const initialState = {
    token: window.localStorage.getItem("token"),
    isAuthenticated: null,
    user: 'ok',
    // phone: null
  };
  export const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_SUCCESS:
        window.localStorage.setItem("token", JSON.stringify(payload.token));
        return {
          ...state,
          token: payload.token,
          phone: payload.phone,
          isAuthenticated: true,
        };
  
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        window.localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          phone: null,
        };
  
      default:
        return state;
    }
  }

  export default rootReducer