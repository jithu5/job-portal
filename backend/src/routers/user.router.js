const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin,Sendotp,Verifyemail,
    SendResetOtp,VerifyResetOtp,UpdatePassword,uploadProfileAndCover,
    updateProfileAndCover,Homepage,Logout,EditProfile } = require('../controllers/user-controller.js');
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

UserRouter.post(
    '/upload-profile-cover',
    upload.fields([
        {name:'profileImage',maxCount:1},
        {name:'coverImage',maxCount:1}
    ]),
    protectUserMiddleware,
    uploadProfileAndCover
);

UserRouter.post(
    '/update-profile-cover',
    upload.fields([
        {name:'profileImage',maxCount:1},
        {name:'coverImage',maxCount:1}
    ]),
    protectUserMiddleware,
    updateProfileAndCover
);

UserRouter.post('/logout',protectUserMiddleware,Logout);

UserRouter.post('/edit-profile',protectUserMiddleware,EditProfile);

module.exports = UserRouter;
