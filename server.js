const express = require('express');
const server = express();
const userDB = require('./users/userDb')
const postDB = require('./posts/postDb')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//middleware
server.use(express.json());
server.use(logger);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
