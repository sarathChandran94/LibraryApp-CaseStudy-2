const express = require('express');
const booksRouter = express.Router();
const Bookdata = require('../model/bookdata');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads/'); },

    filename: (req, file, cb) => { cb(null, file.originalname); }
})
const upload = multer({ storage: storage });

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

    booksRouter.get('/', (req, res) => {
        Bookdata.find()
            .then((newbooks) => {
            res.render('books',
                {
                    nav,
                    token: "",
                    active: 'active',
                    title: 'Library',
                    newbooks
                });
            }).catch((e) => {
                res.send(e);
        });
    });

    booksRouter.get('/:id',(req,res) => {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
        .then((newbook) => {
            res.render('book',
            {
                nav,
                token: "",
                title: 'Library',
                newbook
            });

        });
    });
    booksRouter.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
            .then((editbook) => {
                let editinfo = [
                    {
                        info: editbook.title,
                    },
                    {
                        info: editbook.author,
                    },
                    {
                        info: editbook.genre,
                    },
                    {
                        info: editbook.image,
                    },
                    {
                        info: editbook._id,
                    }
                ]
                res.render('editBook', {
                    title: 'Library',
                    nav,
                    token: "",
                    info,
                    editinfo
                });
            });
    });
    booksRouter.post('/edited/:id',upload.single('image'), async(req, res) => {
        const id = req.params.id;
        const updates = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.path
        };
        const options = { new: true };
        await Bookdata.findByIdAndUpdate(id, updates, options);
        res.redirect('/books');
    });

    booksRouter.get('/delete/:id',(req,res) => {
        const id = req.params.id;
        Bookdata.deleteOne({ _id: id })
        .then((deletebook) => {
            console.log(deletebook)
        });
        res.redirect('/books')
    });

    return booksRouter;

};


module.exports = router;
