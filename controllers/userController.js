const bcrypt = require('bcrypt');
const helpers = require('../helpers/userHelpers');

async function createUser(req, res) {
  const { email, password, currentWeight } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  try {
    const newUser = await helpers.registerNewUser({
      email,
      password: hashedPassword,
      current_weight: currentWeight,
    });
    if (newUser) {
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

module.exports = {
  createUser,
};
