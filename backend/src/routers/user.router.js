const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin,Sendotp,Verifyemail,SendResetOtp,VerifyResetOtp,UpdatePassword,uploadProfilePic } = require('../controllers/user-controller.js');
const protectUserMiddleware = require('../middlewares/userAuth.middleware.js');




UserRouter.get('/user',protectUserMiddleware,GetUser);

UserRouter.post('/register',upload.single('file'),UserRegister);

UserRouter.post("/login",UserLogin);

UserRouter.post("/send-otp",Sendotp);

UserRouter.post('/verifyemail',Verifyemail);

UserRouter.post('/sendresetpassword',SendResetOtp);

UserRouter.post('/verifyresetotp',VerifyResetOtp);

UserRouter.post('/updatepassword',UpdatePassword);

UserRouter.post('/upload-profile-pic', uploadProfilePic);



module.exports = UserRouter;
