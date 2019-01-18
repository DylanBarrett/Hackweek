import {
  USER_REGISTER_ERRORS,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_ERRORS,
  USER_LOGIN_SUCCESS,
  PROFILE_SUCCESS,
  PROFILE_ERRORS
} from "../Actions/Types";

const initialState = {
  registerErrors: {},
  loginErrors: {},
  profileErrors: {},
  active: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_ERRORS:
      return { ...state, registerErrors: action.payload };
    case USER_REGISTER_SUCCESS:
      return { ...state, active: action.payload, registerErrors: {} };

    case USER_LOGIN_ERRORS:
      return { ...state, loginErrors: action.payload };
    case USER_LOGIN_SUCCESS:
      return { ...state, active: action.payload, loginErrors: {} };

    case PROFILE_ERRORS:
      return { ...state, profileErrors: action.payload };
    case PROFILE_SUCCESS:
      return { ...state, active: action.payload, profileErrors: {} };

    default:
      return initialState;
  }
}
