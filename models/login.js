let mongoose = require("mongoose");

let loginSchema = new mongoose.Schema({
  id: String,
  name: String,
  password:String,
  Status: Number,
  timeTillNextLogin: Date,

});

let login = mongoose.model('login', loginSchema);

module.exports = login;