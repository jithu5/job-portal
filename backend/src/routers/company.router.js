const express = require('express');
const CompanyRouter = express.Router();
const { CRegister, GetCompany,CLogin } = require('../controllers/company-controller.js');
const protectCompanyMiddleware = require('../middlewares/companyAuth.middleware.js');



CompanyRouter.get('/',protectCompanyMiddleware,GetCompany);

CompanyRouter.post('/register',CRegister);

CompanyRouter.post("/login",CLogin);



module.exports = CompanyRouter;
