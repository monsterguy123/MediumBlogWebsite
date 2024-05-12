const userRoute = require('express').Router();
const {SignupController,SigninController, userInfo} = require('../Controllers/userController')
const Authmiddleware = require('../Middlewares/Authmiddleware')

userRoute.post('/SignUp',SignupController);
userRoute.post('/signin',SigninController);
userRoute.get('/info',Authmiddleware,userInfo);


module.exports = userRoute;