const express = require('express');
const signupRouter = express.Router();
const userdata = require('../model/signupdata');
const bcrypt = require('bcrypt');

let router = (nav) => {
    // let info = [
    //     {
    //         label: 'Username',
    //         id: 'uName',
    //         type: 'text',
    //     },
    //     {
    //         label: 'Email',
    //         id: 'email',
    //         type: 'email'
    //     },
    //     {
    //         label: 'Phone Number',
    //         id: 'phone',
    //         type: 'tel'
    //     },
    //     {
    //         label: 'Password',
    //         id: 'pass',
    //         type: 'password'
    //     },
    //     {
    //         label: 'Confirm Password',
    //         id: 'pass2',
    //         type: 'password'
    //     }
    // ]

    signupRouter.get('/', (req, res) => {
        res.render('signup',
            {
                nav,
                token: "",
                title: 'Library',
                // info
            }
        );
    });

    signupRouter.post('/user', (req, res) => {
        userdata.find({ username: req.body.username })
            .then(user => {
                if (user.length >=1) {
                    return res.send('ERROR: Username already exists!');
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({ error: err });
                        } else {
                            const udata = {
                                username: req.body.username,
                                phone: req.body.phone,
                                email: req.body.email,
                                dob: req.body.dob,
                                password: hash,
                                accountType: req.body.accountType
                            };
                            let loginuser = userdata(udata);
                            loginuser.save().then((s) => {
                                res.redirect('/login');
                            }).catch((e) => {
                                res.send(e);
                            });
                        }
                    });
                }
            })


    });
    return signupRouter;
}

module.exports = router;
