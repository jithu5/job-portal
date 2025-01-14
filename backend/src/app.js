const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const userModel = require('./models/usermodel');
const companyModel = require('./models/company');
const userRouter = require('./routes/user');
const path = require('path');


const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
passport.serializeUser(companyModel.serializeUser());
passport.deserializeUser(companyModel.deserializeUser());



// error handlers

app.use((err, req, res, next) => {
    console.error(err.stack);
    const errMsg = err.message;
    const statusCode = err.statusCode || 500;
    console.log(errMsg || err);
    res.status(statusCode).json({
        message: errMsg,
        error: err.errors,
    });
});


module.exports = app;
