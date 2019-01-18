import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tutorReducer from "./tutorReducer";

export default combineReducers({
  userReducer: userReducer,
  tutorReducer: tutorReducer
});
