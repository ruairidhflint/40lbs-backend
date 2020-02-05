const jwt = require('jsonwebtoken');
const helper = require('../helpers/userHelpers');

async function generateToken(user) {
  const payload = {
    id: user.id,
  };

  const options = {
    expiresIn: '7d',
  };
  try {
    const token = await jwt.sign(payload, process.env.JWTSecret, options);
    return token;
  } catch (error) {
    return error.message;
  }
}

async function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWTSecret);
    const user = await helper.getUserByID(decoded.id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  decodeToken,
};
