const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const helpers = require('../helpers/userHelpers');


const Router = express.Router();

Router.get('/', (req, res) => {
  res.status(200).json({ message: 'User Route Working' });
});

Router.get('/all', async (req, res) => {
  const users = await helpers.getAllUsers();

  res.status(200).json({ message: 'User Route Working', users });
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
