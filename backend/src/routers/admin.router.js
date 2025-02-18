const express = require('express');
const AdminRouter = express.Router();
const { Login,GetUsers,GetCompany,Logout }= require('../controllers/admin-controller');


// Route to handle admin login
AdminRouter.post('/login', Login);

AdminRouter.get('/getusers', GetUsers);

AdminRouter.get('/getcompany', GetCompany);

AdminRouter.post('/logout', Logout);

module.exports = AdminRouter;