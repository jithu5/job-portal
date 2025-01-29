const express = require('express');
const CompanyRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { CRegister, GetCompany,CLogin,Sendotp,Verifyemail,SendResetOtp,VerifyResetOtp,UpdatePassword,PostJob,uploadProfileAndCover,updateProfileAndCover } = require('../controllers/company-controller.js');
const protectCompanyMiddleware = require('../middlewares/companyAuth.middleware.js');



CompanyRouter.get('/company',protectCompanyMiddleware,GetCompany);

CompanyRouter.post('/register',CRegister);

CompanyRouter.post("/login",CLogin);

CompanyRouter.post("/send-otp",Sendotp);

CompanyRouter.post('/verifyemail',protectCompanyMiddleware,Verifyemail);

CompanyRouter.post('/sendresetpassword',SendResetOtp);

CompanyRouter.post('/verifyresetotp',VerifyResetOtp);

CompanyRouter.post('/updatepassword',UpdatePassword);

CompanyRouter.post('/postjob',protectCompanyMiddleware,PostJob);



module.exports = CompanyRouter;
