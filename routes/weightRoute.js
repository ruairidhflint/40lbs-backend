const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const weightMiddleware = require('../middleware/weightMiddleware');
const helpers = require('../helpers/weightHelpers');

const Router = express.Router();

Router.get('/', [authMiddleware.validateUser], (req, res) => {
  res.status(200).json({ message: 'Weight Route Working' });
});

Router.post(
  '/new',
  [authMiddleware.validateUser, weightMiddleware.checkNewWeightIsValid],
  async (req, res) => {
    try {
      const newWeight = await helpers.postNewWeight(req.body);
      if (!newWeight) {
        res
          .status(500)
          .json({ message: 'There was a problem uploading a new weight' });
      }
      res.status(202).json({ message: 'Upload successful', data: req.body });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'There was a problem uploading a new weight', error });
    }
  },
);

module.exports = Router;
