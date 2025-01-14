const express = require('express');
const router = express.router();
const jobModel = require('../models/jobs');
const companyModel = require('../models/company');
const userModel = require('../models/user');
const historyModel = require('../models/history');
const multer = require('../middlewares/multer.middleware');
const passport = require('passport');
const path = require('path');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

router.get('/', function(req, res) {
    // res.render('index');
});

