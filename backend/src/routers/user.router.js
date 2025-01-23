const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin,Sendotp,Verifyemail,SendResetPassword,VerifyResetOtp,UpdatePassword } = require('../controllers/user-controller.js');
const protectUserMiddleware = require('../middlewares/userAuth.middleware.js');



UserRouter.get('/',protectUserMiddleware,GetUser);

UserRouter.post('/register',UserRegister);

UserRouter.post("/login",UserLogin);

UserRouter.post("/send-otp",Sendotp);

UserRouter.post('/verifyemail',Verifyemail);

UserRouter.post('/sendresetpassword',SendResetPassword);

UserRouter.post('/verifyresetotp',VerifyResetOtp);

UserRouter.post('/updatepassword',UpdatePassword);



module.exports = UserRouter;
