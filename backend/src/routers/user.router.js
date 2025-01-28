const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin,Sendotp,Verifyemail,SendResetOtp,VerifyResetOtp,UpdatePassword,uploadProfilePic,uploadCoverPic,Homepage } = require('../controllers/user-controller.js');
const protectUserMiddleware = require('../middlewares/userAuth.middleware.js');
const nonUserMiddleware = require('../middlewares/nonuser.middleware.js');

UserRouter.get('/home',nonUserMiddleware,Homepage);

UserRouter.get('/user',protectUserMiddleware,GetUser);

UserRouter.post('/register',upload.single('idProof'),UserRegister);

UserRouter.post("/login",UserLogin);

UserRouter.post("/send-otp",Sendotp);

UserRouter.post('/verifyemail',protectUserMiddleware,Verifyemail);

UserRouter.post('/sendresetpassword',SendResetOtp);

UserRouter.post('/verifyresetotp',VerifyResetOtp);

UserRouter.post('/updatepassword',UpdatePassword);

UserRouter.post('/upload-profile-pic',upload.single('file'), uploadProfilePic);




module.exports = UserRouter;
