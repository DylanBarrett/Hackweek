import {
  TUTOR_SUCCESS,
  TUTOR_ERRORS,
  GET_TUTOR_SUCCESS,
  GET_TUTOR_ERRORS
} from "../Actions/Types";

const initialState = {
  tutorErrors: {},
  subjects: null,
  tutors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TUTOR_ERRORS:
      return { ...state, tutorErrors: action.payload };
    case TUTOR_SUCCESS:
      return { ...state, subjects: action.payload, tutorErrors: {} };

    case GET_TUTOR_ERRORS:
      return { ...state, tutorErrors: action.payload };
    case GET_TUTOR_SUCCESS:
      return { ...state, tutors: action.payload, tutorErrors: {} };

    default:
      return initialState;
  }
}
