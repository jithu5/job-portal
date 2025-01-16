const express = require('express');
const CompanyRouter = express.Router();
const jobModel = require('../models/jobs.js');
const companyModel = require('../models/company.js');
const userModel = require('../models/usermodel.js');
const historyModel = require('../models/history.js');
const {upload} = require('../middlewares/multer.middleware.js');
const passport = require('passport');
const path = require('path');
const { CRegister, GetUser,CLogin } = require('../controllers/company-controller.js');



CompanyRouter.get('/',GetUser);

CompanyRouter.post('/cregister',CRegister);

CompanyRouter.post("/clogin",CLogin);



module.exports = CompanyRouter;
