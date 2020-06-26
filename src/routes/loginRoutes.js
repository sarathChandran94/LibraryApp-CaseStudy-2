const express = require('express');
const loginRouter = express.Router();
const userdata = require('../model/signupdata');
const bcrypt = require('bcrypt');

let router = (nav) => {

    let info = [
        {
            label: 'Email',
            id: 'email',
            type: 'text'
        },
        {
            label: 'Password',
            id: 'pass',
            type: 'password'
        }
    ]

    loginRouter.get('/', (req, res) => {
        userdata.find().then((users) => {
            res.render('login',
            {
                nav,
                token: "",
                hide: '',
                title: 'Library',
                valid: '',
                info,
                users
            });
        })

    });

    loginRouter.post('/user', (req, res) => {
        const id = req.params.id
        let logindata = {
            email: req.body.email,
            password: req.body.password
        };
        userdata.find({ email: logindata.email })
            .then((loginuser) => {
                if (loginuser.length < 1) {
                    res.render('login',
                        {
                            nav,
                            token: "",
                            title: 'Library',
                            valid: 'is-invalid',
                            info
                        });
                    return res.status(401);
                }
                bcrypt.compare(logindata.password, loginuser[0].password, (err, result) => {
                    if (err) {
                        res.render('login',
                            {
                                nav,
                                token: "",
                                title: 'Library',
                                valid: 'is-invalid',
                                info
                            });
                        return res.status(401);
                    }
                    if (result) {


                        const mynav = [
                            {
                                link: '/books', name: 'BOOKS',
                            },
                            {
                                link: '/authors', name: 'AUTHORS',
                            },
                            {
                                link: '/admin', name: 'ADD BOOKS', hide: 'hidden',
                            },
                            {
                                link: '/admin/author', name: 'ADD AUTHOR', hide: 'hidden', jtoken: "token"
                            },
                            {
                                link: '/login', name: 'LOGIN',
                            },
                            {
                                link: '/signup', name: 'SIGNUP',
                            }
                        ];
                        res.render('index',
                            {
                                title: 'Library',
                                token: loginuser[0].accountType,
                                mynav,
                                user: loginuser[0].username,
                                id: loginuser[0]._id,
                            },
                        );
                        console.log(result)
                        console.log(token)
                        return res.status(200);
                    }
                    res.render('login',
                        {
                            nav,
                            token: "",
                            title: 'Library',
                            valid: 'is-invalid',
                            info
                        });
                });
            });
    })




    return loginRouter;
};

module.exports = router;
