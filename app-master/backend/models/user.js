var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  gradeLevel: String,
  password: String,
  userType: String,
  subjects: [String]
});

module.exports = mongoose.model("User", UserSchema);
