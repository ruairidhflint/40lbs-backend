const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const Router = express.Router();

Router.get('/', [authMiddleware.validateUser], (req, res) => {
  res.status(200).json({ message: 'Weight Route Working' });
});

module.exports = Router;
