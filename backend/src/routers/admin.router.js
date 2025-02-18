const express = require('express');
const AdminRouter = express.Router();
const ProtectAdminMiddleware = require("../middlewares/adminAuth.middleware.js");
const { Register,Login,GetUsers,GetCompany,Logout }= require("../controllers/admin-controller.js");


AdminRouter.post('/register', Register);

AdminRouter.post('/login', Login);

AdminRouter.get('/getusers',ProtectAdminMiddleware, GetUsers);

AdminRouter.get('/getcompany',ProtectAdminMiddleware, GetCompany);

AdminRouter.post('/logout',ProtectAdminMiddleware, Logout);

module.exports = AdminRouter;