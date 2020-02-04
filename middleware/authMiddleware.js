function checkAllRegisterFieldsPresent(req, res, next) {
  const { email, password, currentWeight } = req.body;

  if (email && password && currentWeight) {
    next();
  } else {
    res.status(400).json({ message: 'Please ensure all fields are present' });
  }
}

module.exports = {
  checkAllRegisterFieldsPresent,
};
