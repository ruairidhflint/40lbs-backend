const Validator = require('validatorjs');

function checkAllRegisterFieldsPresent(req, res, next) {
  const validator = new Validator(req.body, {
    password: 'required|min:8',
    email: 'required|email',
    currentWeight: 'required|numeric',
  });
  if (validator.fails()) {
    res.status(400).json({ message: 'Please ensure all fields are present and valid' });
  } else {
    next();
  }
}

module.exports = {
  checkAllRegisterFieldsPresent,
};
