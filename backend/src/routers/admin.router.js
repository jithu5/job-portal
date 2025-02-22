const express = require('express');
const AdminRouter = express.Router();
const ProtectAdminMiddleware = require("../middlewares/adminAuth.middleware.js");
const { Register,Login,SendResetOtp,VerifyResetOtp,UpdatePassword,GetAdmin,GetUsers,GetCompany,ViewUser,ViewCompany,DeleteUser,DeleteCompany,Logout }= require("../controllers/admin-controller.js");


AdminRouter.post('/register', Register);

AdminRouter.post('/login', Login);

AdminRouter.post('/sendresetpassword-otp',SendResetOtp);

AdminRouter.post('/verifyresetotp',VerifyResetOtp);

AdminRouter.post('/updatepassword',UpdatePassword);

AdminRouter.get('/admin', ProtectAdminMiddleware, GetAdmin);

AdminRouter.get('/getusers',ProtectAdminMiddleware, GetUsers);

AdminRouter.get('/getcompany',ProtectAdminMiddleware, GetCompany);

AdminRouter.get('/view-user/:userId',ProtectAdminMiddleware, ViewUser);

AdminRouter.get('/view-company/:companyId',ProtectAdminMiddleware, ViewCompany);

AdminRouter.post('/deleteuser/:userId',ProtectAdminMiddleware, DeleteUser);

AdminRouter.post('/deletecompany/:companyId',ProtectAdminMiddleware, DeleteCompany);

AdminRouter.post('/logout',ProtectAdminMiddleware, Logout);

module.exports = AdminRouter;