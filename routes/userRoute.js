const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const Router = express.Router();

Router.get('/', (req, res) => {
  res.status(200).json({ message: 'User Route Working' });
});

Router.post(
  '/register',
  [
    authMiddleware.checkAllRegisterFieldsPresent,
    authMiddleware.checkIfUserExists,
  ],
  userController.createUser,
);

Router.post(
  '/login',
  [authMiddleware.checkLoginDetailsPresent],
  userController.loginUser,
);

Router.patch('/confirm', userController.confirmUser);

module.exports = Router;
