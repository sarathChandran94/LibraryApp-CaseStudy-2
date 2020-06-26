const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');

// Schema Definition
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    author: String,
    title: String,
    genre: String,
    image: String
});

// Model Creation
let Authordata = mongoose.model('authordata', AuthorSchema);
module.exports = Authordata;
