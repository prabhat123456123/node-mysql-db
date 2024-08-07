const { userController: { getUsers, getUserById } } = require('../controller');
const { verifyRoles:{restrictTo},verifyToken:{validateToken} } = require('../middleware');
const userRouter = require('express').Router();



userRouter.get('/get-users',getUsers);
userRouter.post('/get-user-by-id',validateToken,restrictTo('USER'), getUserById);

module.exports = {userRouter}