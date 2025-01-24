const express = require('express');
const CompanyRouter = express.Router();
const { CRegister, GetCompany,CLogin,Sendotp,Verifyemail,SendResetOtp,VerifyResetOtp,UpdatePassword } = require('../controllers/company-controller.js');
const protectCompanyMiddleware = require('../middlewares/companyAuth.middleware.js');



CompanyRouter.get('/',protectCompanyMiddleware,GetCompany);

CompanyRouter.post('/register',CRegister);

CompanyRouter.post("/login",CLogin);

CompanyRouter.post("/send-otp",Sendotp);

CompanyRouter.post('/verifyemail',Verifyemail);

CompanyRouter.post('/sendresetpassword',SendResetOtp);

CompanyRouter.post('/verifyresetotp',VerifyResetOtp);

CompanyRouter.post('/updatepassword',UpdatePassword);



module.exports = CompanyRouter;
