const express = require('express');
const UserRouter = express.Router();
const jobModel = require('../models/jobs.js');
const companyModel = require('../models/company.js');
const userModel = require('../models/user.js');
const historyModel = require('../models/history.js');
const {upload} = require('../middlewares/multer.middleware.js');
const passport = require('passport');
const path = require('path');
const localStrategy = require('passport-local').Strategy;
const { UserRegister, GetUser } = require('../controllers/user-controller.js');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

UserRouter.get('/',GetUser);

UserRouter.post("/register",UserRegister)


module.exports = UserRouter;
