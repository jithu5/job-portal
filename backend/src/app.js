const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
var userModel = require('./models/usermodel');
var companyModel = require('./models/company');
const path = require('path');
const UserRouter = require('./routers/user.router.js');
const CompanyRouter = require('./routers/company.router.js');
const MongoStore = require('connect-mongo');
const db = require('./db/connect');


const app = express();

db();

// session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET||"jobportalsecret",
    store: new MongoStore({
        mongoUrl:'mongodb://127.0.0.1:27017/job-portal',
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        }),
    cookie: {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
        sameSite: "lax", // Protects against CSRF attacks
         maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use("/api/auth/user", UserRouter);
app.use("/api/auth/company", CompanyRouter);


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
