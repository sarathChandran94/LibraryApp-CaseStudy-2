const express = require('express');
const addBookRouter = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads/'); },

    filename: (req, file, cb) => { cb(null, file.originalname); }
})
const upload = multer({ storage: storage });
const Bookdata = require('../model/bookdata')
const Authordata = require('../model/authordata')

let router = (nav) => {

    let info = [
        {
            label: 'Title',
            id: 'title',
            type: 'text'
        },
        {
            label: 'Author',
            id: 'author',
            type: 'text'
        },
        {
            label: 'Genre',
            id: 'genre',
            type: 'text'
        },
        {
            label: 'Image',
            id: 'image',
            type: 'file',
            accept: 'image/*'
        }
    ]

    addBookRouter.get('/', (req, res) => {
        res.render('addBooks',
            {
                nav,
                title: 'myLibrary',
                info
            });
    });

    addBookRouter.get('/author', (req, res) => {
        let info = [
            {
                label: 'Author',
                id: 'author',
                type: 'text'
            },
            {
                label: 'Titles',
                id: 'title',
                type: 'text'
            },
            {
                label: 'Genres',
                id: 'genre',
                type: 'text'
            },
            {
                label: 'Image',
                id: 'image',
                type: 'file',
                accept: 'image/*'
            }
        ]
        res.render('addAuthor',
            {
                nav,
                title: 'myLibrary',
                info
            });
    });

    addBookRouter.post('/add', upload.single('image'), (req, res) => {
        let Obj = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.path
        };
        let book = Bookdata(Obj);
        book.save();
        res.redirect('/books');
        console.log(req.file);
    });

    addBookRouter.post('/addauth',upload.single('image'), (req, res) => {
        let Obj = {
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            image: req.file.path
        };
        let author = Authordata(Obj);
        author.save();
        res.redirect('/authors');
    });

    return addBookRouter;
};

module.exports = router;
