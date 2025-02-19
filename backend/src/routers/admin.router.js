const express = require('express');
const AdminRouter = express.Router();
const ProtectAdminMiddleware = require("../middlewares/adminAuth.middleware.js");
const { Register,Login,GetUsers,GetCompany,ViewUser,ViewCompany,DeleteUser,DeleteCompany,Logout }= require("../controllers/admin-controller.js");


AdminRouter.post('/register', Register);

AdminRouter.post('/login', Login);

AdminRouter.get('/getusers',ProtectAdminMiddleware, GetUsers);

AdminRouter.get('/getcompany',ProtectAdminMiddleware, GetCompany);

AdminRouter.post('/view-user/:userId',ProtectAdminMiddleware, ViewUser);

AdminRouter.post('/view-company/:companyId',ProtectAdminMiddleware, ViewCompany);

AdminRouter.post('/deleteuser/:userId',ProtectAdminMiddleware, DeleteUser);

AdminRouter.post('/deletecompany/:companyId',ProtectAdminMiddleware, DeleteCompany);

AdminRouter.post('/logout',ProtectAdminMiddleware, Logout);

module.exports = AdminRouter;