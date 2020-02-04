const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const Router = express.Router();

/*
@@@ Routes needed @@@

@ Register @
- Requires valid email, password and current weight
- POST to '/register'
- bcrypt to hash password

@ Log in @
- Requires valid email and password
- POST to '/login'
- Bcrypt to match passwords
- JSON Web Token send and stored -somewhere- to authenticate

*/

Router.get('/', (req, res) => {
  res.status(200).json({ message: 'User Route Working' });
});

Router.post(
  '/register',
  [authMiddleware.checkAllRegisterFieldsPresent],
  (req, res) => {
    res.status(200).json({ message: 'You made it!' });
  },
);

module.exports = Router;
