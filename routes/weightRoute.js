const express = require('express');

const Router = express.Router();

Router.get('/', (req, res) => {
  res.status(200).json({ message: 'Weight Route Working' });
});

module.exports = Router;
