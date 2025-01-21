const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const UserRouter = require('./routers/user.router.js');
const CompanyRouter = require('./routers/company.router.js');

const app = express();

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
