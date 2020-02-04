const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoute = require('./routes/userRoute');
const weightRoute = require('./routes/weightRoute');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', userRoute);
server.use('/weight', weightRoute);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Working', database: process.env.DB_ENV });
});

module.exports = server;
