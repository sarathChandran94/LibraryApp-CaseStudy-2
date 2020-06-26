const express = require('express');
const signupRouter = express.Router();
const userdata = require('../model/signupdata');

let router = (nav) => {
    let info = [
        {
            label: 'Username',
            id: 'uName',
            type: 'text'
        },
        {
            label: 'Email',
            id: 'email',
            type: 'email'
        },
        {
            label: 'Phone Number',
            id: 'phone',
            type: 'tel'
        },
        {
            label: 'Password',
            id: 'pass',
            type: 'password'
        },
        {
            label: 'Confirm Password',
            id: 'pass2',
            type: 'password'
        }
    ]

    signupRouter.get('/', (req, res) => {
        res.render('signup',
            {
                nav,
                title: 'Library',
                info
            }
        );
    });

    signupRouter.post('/user', (req, res) => {
        let udata = {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            dob: req.body.dob,
            password: req.body.password
        }
        let user = userdata(udata);
        user.save();
        res.redirect('/login');
    });
    return signupRouter;
}

module.exports = router;
