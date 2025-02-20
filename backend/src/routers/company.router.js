const express = require('express');
const CompanyRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { CRegister, GetCompany,CLogin,Sendotp,Verifyemail,
    SendResetOtp,VerifyResetOtp,UpdatePassword,PostJob,
    updateProfileAndCover,DeleteProfileImage,DeleteCoverImage,Logout,EditProfile,EditJob,Deletejob,
    checkCompanynameUnique,GetApplicants,GetAllPostedJob } = require('../controllers/company-controller.js');
const protectCompanyMiddleware = require('../middlewares/companyAuth.middleware.js');



CompanyRouter.get('/company',protectCompanyMiddleware,GetCompany);

CompanyRouter.get('/checkcompanynameunique',checkCompanynameUnique);

CompanyRouter.get('/getapplicants/:jobId',protectCompanyMiddleware,GetApplicants);

CompanyRouter.get('/getallpostedjobs',protectCompanyMiddleware,GetAllPostedJob);

CompanyRouter.post('/register',CRegister);

CompanyRouter.post("/login",CLogin);

CompanyRouter.post("/send-otp",Sendotp);

CompanyRouter.post('/verifyemail',protectCompanyMiddleware,Verifyemail);

CompanyRouter.post('/sendresetpassword',SendResetOtp);

CompanyRouter.post('/verifyresetotp',VerifyResetOtp);

CompanyRouter.post('/updatepassword',UpdatePassword);

CompanyRouter.post('/postjob',protectCompanyMiddleware,PostJob);

CompanyRouter.post(
    "/update-profile-cover",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    protectCompanyMiddleware,
    updateProfileAndCover
);

CompanyRouter.post('/delete-profilepic',protectCompanyMiddleware,DeleteProfileImage);

CompanyRouter.post('/delete-coverpic',protectCompanyMiddleware,DeleteCoverImage);

CompanyRouter.post('/logout',protectCompanyMiddleware,Logout);

CompanyRouter.post('/edit-profile',protectCompanyMiddleware,EditProfile);

CompanyRouter.post('/editjob/:jobId',protectCompanyMiddleware,EditJob);

CompanyRouter.post('/deletejob/:jobId',protectCompanyMiddleware,Deletejob);

module.exports = CompanyRouter;
