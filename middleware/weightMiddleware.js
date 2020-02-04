const Validator = require('validatorjs');

function checkNewWeightIsValid(req, res, next) {
  const validator = new Validator(req.body, {
    date: 'required',
    weight: 'required|numeric',
    user_id: 'required|numeric',
  });
  if (validator.fails()) {
    res
      .status(400)
      .json({ message: 'Please ensure all fields are present and valid' });
  } else {
    next();
  }
}

module.exports = {
  checkNewWeightIsValid,
};
