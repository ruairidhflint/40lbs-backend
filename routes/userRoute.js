const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const helpers = require('../helpers/userHelpers');

const Router = express.Router();

/*
@@@ Routes needed @@@

@ Register @
- POST to '/register'
- Requires valid email, password and current weight.
- email must be a valid email, current weight must be numeric
- password must contain 8 characters
- email mustn't already be in use
- bcrypt to hash password

@ Log in @
- Requires valid email and password
- POST to '/login'
- Bcrypt to match passwords
- JSON Web Token send and stored -somewhere- to authenticate

*/
Router.get('/', async (req, res) => {
  try {
    const users = await helpers.getAllUsers();
    res.status(200).json({ message: 'User Route Working', users });
  } catch (error) {
    res.status(500).json({ error });
  }
});

Router.post(
  '/register',
  [
    authMiddleware.checkAllRegisterFieldsPresent,
    authMiddleware.checkIfUserExists,
  ],
  (req, res) => {
    res.status(200).json({ message: 'You made it!' });
  },
);

module.exports = Router;
