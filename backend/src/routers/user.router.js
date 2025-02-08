const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin,Sendotp,Verifyemail,
    SendResetOtp,VerifyResetOtp,UpdatePassword,
    updateProfileAndCover,Homepage,Logout,EditProfile,ApplyJob,Canceljob,GetJobs,sortJobs, 
    checkUsernameUnique,AppliedJobs,AddToWishlist,GetWishlistJobs,RemoveWishlist,
    GetJobById} = require('../controllers/user-controller.js');
const protectUserMiddleware = require('../middlewares/userAuth.middleware.js');
const nonUserMiddleware = require('../middlewares/nonuser.middleware.js');

UserRouter.get('/home',nonUserMiddleware,Homepage);

UserRouter.get('/user',protectUserMiddleware,GetUser);

UserRouter.get('/jobs',protectUserMiddleware,GetJobs);

UserRouter.get('/sortedjobs',protectUserMiddleware,sortJobs);

UserRouter.get('/job/:jobId',protectUserMiddleware,GetJobById);

UserRouter.post('/register',upload.single('idProof'),UserRegister);

UserRouter.get('/appliedjobs',protectUserMiddleware,AppliedJobs);

UserRouter.get('/checkusernameunique',checkUsernameUnique);

UserRouter.get('/getwishlist',protectUserMiddleware,GetWishlistJobs);

UserRouter.post("/login",UserLogin);

UserRouter.post("/send-otp",Sendotp);

UserRouter.post('/verifyemail',protectUserMiddleware,Verifyemail);

UserRouter.post('/sendresetpassword',SendResetOtp);

UserRouter.post('/verifyresetotp',VerifyResetOtp);

UserRouter.post('/updatepassword',UpdatePassword);

UserRouter.post('/addtoWishlist/:jobId',protectUserMiddleware,AddToWishlist);

UserRouter.post('/removefromwishlist/:jobId',protectUserMiddleware,RemoveWishlist);


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

UserRouter.post("/applyjob/:jobId", protectUserMiddleware, ApplyJob);

UserRouter.post('/cancel-job/:jobId',protectUserMiddleware,Canceljob);



module.exports = UserRouter;
