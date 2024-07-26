const { authController: { signupHandler, loginHandler } } = require('../controller');
const { auth: { signupValidation } } = require('../validations');

const authRouter = require('express').Router();


authRouter.post('/signup',signupValidation, signupHandler);
authRouter.post('/login', loginHandler);

module.exports = {authRouter}