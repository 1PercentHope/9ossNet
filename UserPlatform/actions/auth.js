import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "./types";

// login user
export const login = (numberPhone,password) => async (dispatch) => {
  axios
    .post("http://localhost:5000/users/signin", {numberPhone: numberPhone, password: password})
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};