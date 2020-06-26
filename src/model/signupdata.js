const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');

// Schema Definition
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    phone: Number,
    email: String,
    dob: String,
    password: String,
    accountType: String
});

// Model Creation
let userdata = mongoose.model('signupdata', UserSchema);

module.exports = userdata;
