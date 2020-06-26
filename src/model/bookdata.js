const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');

// Schema Definition
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});

// Model Creation
let Bookdata = mongoose.model('bookdata', BookSchema);
module.exports = Bookdata;
