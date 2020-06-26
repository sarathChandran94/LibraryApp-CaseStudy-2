const express = require('express');
const app = new express();
const nav = [
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
        link: '/admin/author', name: 'ADD AUTHOR', hide: 'hidden', 
    },
    {
        link: '/login', name: 'LOGIN', 
    },
    {
        link: '/signup', name: 'SIGNUP',
    }
];

const chalk = require('chalk');
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const loginRouter = require('./src/routes/loginRoutes')(nav);
const signupRouter = require('./src/routes/signupRoutes')(nav);
const addBookRouter = require('./src/routes/addBookRoutes')(nav);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/uploads',express.static('uploads'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/admin', addBookRouter);

app.get('/',(req,res) => {
    res.render('index',
    {
        title:'myLibraryApp',
        nav,
        token: '',
        user: ''

    });
});




app.listen(9000, () => console.log(chalk.redBright(`listening on port: ${chalk.underline.yellowBright(9000)}...`)));
