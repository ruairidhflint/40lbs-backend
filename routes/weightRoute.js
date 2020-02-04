const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const weightMiddleware = require('../middleware/weightMiddleware');
const weightController = require('../controllers/weightController');

const Router = express.Router();

Router.get('/', [authMiddleware.validateUser], (req, res) => {
  res.status(200).json({ message: 'Weight Route Working' });
});

Router.post(
  '/new',
  [authMiddleware.validateUser, weightMiddleware.checkNewWeightIsValid],
  weightController.postNewWeight,
);

module.exports = Router;
