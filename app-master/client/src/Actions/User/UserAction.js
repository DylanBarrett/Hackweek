import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERRORS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERRORS,
  PROFILE_SUCCESS,
  PROFILE_ERRORS
} from "../Types";
import axios from "axios";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("https://www.derekrogers.me/api/users/register", userData)
    .then(res => {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: "login" });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: USER_REGISTER_ERRORS,
        payload: err.response.data
      });
    });
};

// Login User
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("https://www.derekrogers.me:3001/api/users/login", userData)
    .then(res => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: "profile" });
      localStorage.setItem("userToken", res.data.token);
      history.push("/profile");
    })
    .catch(err =>
      dispatch({
        type: USER_LOGIN_ERRORS,
        payload: err.response.data
      })
    );
};

// add Profile
export const addProfile = (userData, history) => dispatch => {
  axios
    .put("https://www.derekrogers.me:3001/api/users/profile", userData)
    .then(res => {
      dispatch({ type: PROFILE_SUCCESS, payload: "tutors" });
      history.push("/tutors");
    })
    .catch(err => {
      dispatch({
        type: PROFILE_ERRORS,
        payload: err.response.data
      });
    });
};
