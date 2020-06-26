const express = require('express');
const loginRouter = express.Router();
const userdata = require('../model/signupdata');

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
        res.render('login',
            {
                nav,
                hide: '',
                title: 'Library',
                valid: '',
                info
            });
    });

    loginRouter.post('/user', (req, res) => {
        let logindata = {
            email: req.body.email,
            password: req.body.password
        };
        userdata.findOne({ email: logindata.email })
            .then((loginuser) => {
                // console.log(`loginuser: ${loginuser}`);
                // console.log(`logindata: {${logindata.email},${logindata.password}}`);
                // res.send('login success');
                if (loginuser == null) {
                    res.render('login',
                    {
                        nav,
                        title: 'Library',
                        valid: 'is-invalid',
                        info
                    });
                }
                else if (loginuser.email != logindata.email || loginuser.password != logindata.password){
                    res.render('login',{
                        nav,
                        title: 'Library',
                        valid: 'is-invalid',
                        info
                    });
                }
                else {
                    res.render('index',
                        {
                            title: 'Library',
                            nav,
                        });
                }
            }).catch((e) => {
                res.send(e);
            })
    })

    return loginRouter;
};

module.exports = router;
