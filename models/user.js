let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
id: String,
lastSignedOn: Date,
screenName: String,
email: String,
createdOn: Date,

notification : [
    {
        created_on : Date,
        message : String,
        link : String,
        view_status : Boolean,
    } ],
    role : [
        {
            role_id : String,
            role_name : String,
            role_desc : String,
        }
    ],


});

let user = mongoose.model('user', userSchema);

module.exports = user;