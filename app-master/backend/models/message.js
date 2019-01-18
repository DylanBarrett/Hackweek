var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
        msg: String,
  createdAt: String,
         to: String,
       from: String
});

module.exports = mongoose.model('Message', MessageSchema);
