const express = require('express');
const server = express();
const userDB = require('./users/userDb')
const postDB = require('./posts/postDb')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
  console.log()
});

//middleware
server.use(express.json());
server.use(logger);

//custom middleware

function logger(req, res, next) {
  next();
}

//endpoints

server.get('/api/users', (req, res) => {
  userDB.get(req.query)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/users/:id', (req, res) => {
  userDB.getById(req.params.id)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts', (req, res) => {
  postDB.get(req.query)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts/:id', (req, res) => {
  postDB.getById(req.params.id)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

module.exports = server;
