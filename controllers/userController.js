const bcrypt = require('bcrypt');
const helpers = require('../helpers/userHelpers');
const { generateToken } = require('../helpers/jwtHelpers');
const { sendEmailConfirmAccount } = require('../helpers/mail');

async function createUser(req, res) {
  const { email, password, currentWeight } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  try {
    const newUser = await helpers.registerNewUser({
      email,
      password: hashedPassword,
      currentWeight,
    });
    if (newUser) {
      const token = await generateToken({ id: newUser[0], email });
      sendEmailConfirmAccount({ email }, token, 'https://www.google.com');
      res.status(200).json({ message: 'User successfully registered' });
    } else {
      res
        .status(500)
        .json({ message: 'There was an error creating a new user' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was an error creating a new user', error });
  }
}

async function loginUser(req, res) {
  try {
    const user = await helpers.getUserByEmail(req.body.email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
    }
    const confirm = bcrypt.compareSync(req.body.password, user.password);
    if (!confirm) {
      res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = await generateToken(user);
    if (!user.confirmed) {
      res.status(200).json({ message: 'Please confirm your account' });
    }
    res.status(200).json({
      message: 'Successful log in',
      user: {
        id: user.id,
        currentWeight: user.currentWeight,
        confirmed: user.confirmed,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'There was a problem logging in.' });
  }
}

module.exports = {
  createUser,
  loginUser,
};
