const Validator = require('validatorjs');
const userHelpers = require('../helpers/userHelpers');
const { decodeToken } = require('../helpers/jwtHelpers');

function checkAllRegisterFieldsPresent(req, res, next) {
  const validator = new Validator(req.body, {
    password: 'required|min:8',
    email: 'required|email',
    currentWeight: 'required|numeric',
  });
  if (validator.fails()) {
    res
      .status(400)
      .json({ message: 'Please ensure all fields are present and valid' });
  } else {
    next();
  }
}

async function checkIfUserExists(req, res, next) {
  const { email } = req.body;
  try {
    const user = await userHelpers.getUserByEmail(email);
    if (!user) {
      next();
    } else {
      res
        .status(400)
        .json({ message: 'This email address is already in use.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error in registering your account.' });
  }
}

function checkLoginDetailsPresent(req, res, next) {
  const validator = new Validator(req.body, {
    password: 'required|min:8',
    email: 'required|email',
  });
  if (validator.fails()) {
    res
      .status(400)
      .json({ message: 'Please ensure all fields are present and valid' });
  } else {
    next();
  }
}

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Please provide a valid token' });
  }
  const user = await decodeToken(authorization);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
  req.user = user;
  return next();
}

module.exports = {
  checkAllRegisterFieldsPresent,
  checkIfUserExists,
  checkLoginDetailsPresent,
  validateUser,
};
