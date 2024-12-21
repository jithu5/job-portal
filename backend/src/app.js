const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




module.exports = app;
