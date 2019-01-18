import {
  TUTOR_SUCCESS,
  TUTOR_ERRORS,
  GET_TUTOR_SUCCESS,
  GET_TUTOR_ERRORS
} from "../Types";
import axios from "axios";

// get subjects
export const getSubjects = id => dispatch => {
  axios
    .post(`https://www.derekrogers.me:3001/api/tutors/${id}/subjects`)
    .then(res => {
      dispatch({ type: TUTOR_SUCCESS, payload: res.data.subjects });
    })
    .catch(err => {
      dispatch({
        type: TUTOR_ERRORS,
        payload: err
      });
    });
};

// get tutors
export const getTutors = subjects => dispatch => {
  axios
    .get(
      `https://www.derekrogers.me:3001/api/tutors/gettutors?subjects=${JSON.stringify(
        subjects
      )}`
    )
    .then(res => {
      dispatch({ type: GET_TUTOR_SUCCESS, payload: res.data.tutors });
    })
    .catch(err => {
      dispatch({
        type: GET_TUTOR_ERRORS,
        payload: err
      });
    });
};
