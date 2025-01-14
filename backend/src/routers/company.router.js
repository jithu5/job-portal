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
    cnameField: 'email',
    passwordField: 'password'
},companyModel.authenticate()));
passport.serializeUser(companyModel.serializeUser());
passport.deserializeUser(companyModel.deserializeUser());