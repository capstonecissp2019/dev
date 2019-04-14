let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
id: String,
lastSignedOn: Date,
screenName: String,
email: String,
createdOn: Date,
rollId: String,
rollName:String,
rollDesc:String,

});

let user = mongoose.model('user', userSchema);

module.exports = user;