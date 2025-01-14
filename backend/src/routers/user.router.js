const express = require('express');
const UserRouter = express.Router();
const jobModel = require('../models/jobs.js');
const companyModel = require('../models/company.js');
const userModel = require('../models/usermodel.js');
const historyModel = require('../models/history.js');
const {upload} = require('../middlewares/multer.middleware.js');
const passport = require('passport');
const path = require('path');
const { UserRegister, GetUser,UserLogin } = require('../controllers/user-controller.js');



UserRouter.get('/',GetUser);

UserRouter.post('/register',UserRegister);

UserRouter.post("/login",UserLogin);



module.exports = UserRouter;
