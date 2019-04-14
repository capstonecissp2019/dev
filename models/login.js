let mongoose = require("mongoose");

let loginSchema = new mongoose.Schema({
  name: String,
  password:String,
});

let login = mongoose.model('login', loginSchema);

module.exports = login;