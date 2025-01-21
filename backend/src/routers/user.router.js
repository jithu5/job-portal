const express = require('express');
const UserRouter = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const { UserRegister, GetUser,UserLogin } = require('../controllers/user-controller.js');
const protectUserMiddleware = require('../middlewares/userAuth.middleware.js');



UserRouter.get('/',protectUserMiddleware,GetUser);

UserRouter.post('/register',UserRegister);

UserRouter.post("/login",UserLogin);



module.exports = UserRouter;
