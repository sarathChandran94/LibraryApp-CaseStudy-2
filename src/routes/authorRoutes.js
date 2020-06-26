const express = require('express');
const authorsRouter = express.Router();
const Authordata = require('../model/authordata');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads/'); },

    filename: (req, file, cb) => { cb(null, file.originalname); }
})
const upload = multer({ storage: storage });

let router = (nav) => {

    let info = [
        {
            label: 'Author',
            id: 'author',
            type: 'text'
        },
        {
            label: 'Title',
            id: 'title',
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

    // authors page
    authorsRouter.get('/', (req, res) => {
        Authordata.find()
            .then((newauthors) => {
                res.render('authors',
                    {
                        nav,
                        token: "",
                        title: 'Library',
                        newauthors
                    });
            }).catch((e) => {
                res.send(e);
            });

    });

    // author page
    authorsRouter.get('/:id',(req,res) => {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
        .then((newauthor) => {
            res.render('author',
            {
                nav,
                token: "",
                title: 'Library',
                newauthor
            });
        });

    });

    // author edit page
    authorsRouter.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
            .then((editauthor) => {
                let editinfo = [
                    {
                        info: editauthor.author,
                    },
                    {
                        info: editauthor.title,
                    },
                    {
                        info: editauthor.genre,
                    },
                    {
                        info: editauthor.image,
                    },
                    {
                        info: editauthor._id,
                    }
                ]
                res.render('editAuthor', {
                    title: 'Library',
                    nav,
                    token: '',
                    info,
                    editinfo
                });
            });
    });

    // author editing
    authorsRouter.post('/edited/:id',upload.single('image'), async(req, res) => {
        const id = req.params.id;
        const updates = {
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            image: req.file.path
        };
        const options = { new: true };
        await Authordata.findByIdAndUpdate(id, updates, options);
        res.redirect('/authors');
    });

    // author delete page
    authorsRouter.get('/delete/:id',(req,res) => {
        const id = req.params.id;
        Authordata.deleteOne({ _id: id })
        .then((deleteauthor) => {
        });
        res.redirect('/authors');

    });

    return authorsRouter;

};


module.exports = router;
