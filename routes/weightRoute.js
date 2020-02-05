const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const weightMiddleware = require('../middleware/weightMiddleware');
const weightController = require('../controllers/weightController');
const weightHelper = require('../helpers/weightHelpers');

const Router = express.Router();

Router.get('/', [authMiddleware.validateUser], (req, res) => {
  res.status(200).json({ message: 'Weight Route Working' });
});

Router.post(
  '/new',
  [authMiddleware.validateUser, weightMiddleware.checkNewWeightIsValid],
  weightController.postNewWeight,
);

Router.get('/user', [authMiddleware.validateUser], async (req, res) => {
  try {
    const weights = await weightHelper.getRecentWeightsById(req.user.id);
    if (!weights) {
      res
        .status(400)
        .json({ message: 'There was a problem retrieivng your data' });
    }
    res.status(200).json({ weights });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem retrieivng your data', error });
  }
});

Router.get('/user/all', [authMiddleware.validateUser], async (req, res) => {
  try {
    const weights = await weightHelper.getAllWeightsById(req.user.id);
    if (!weights) {
      res
        .status(400)
        .json({ message: 'There was a problem retrieivng your data' });
    }
    res.status(200).json({ weights });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem retrieivng your data', error });
  }
});

module.exports = Router;
