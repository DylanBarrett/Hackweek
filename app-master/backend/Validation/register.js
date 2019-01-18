const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.gradeLevel = !isEmpty(data.gradeLevel) ? data.gradeLevel : "";
  data.userType = !isEmpty(data.userType) ? data.userType : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.gradeLevel)) {
    errors.gradeLevel = "Grade level field is required";
  }

  // if (
  //   data.gradeLevel != "9" ||
  //   data.gradeLevel != "10" ||
  //   data.gradeLevel != "11" ||
  //   data.gradeLevel != "12" ||
  //   data.gradeLevel != "college"
  // ) {
  //   errors.gradeLevel = "Grade level must be between 9-12 or college.";
  // }

  // if (data.userType != "student" || data.userType != "tutor") {
  //   errors.userType = "User type field must be student or tutor.";
  // }

  if (Validator.isEmpty(data.userType)) {
    errors.userType = "User type field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
