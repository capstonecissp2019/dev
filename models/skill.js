let mongoose = require("mongoose");

let loginSchema = new mongoose.Schema({
  id: String,
skilltree: [],

});

let login = mongoose.model('login', loginSchema);

module.exports = login;