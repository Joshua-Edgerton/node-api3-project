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

function logger(req, res, next) {
  next();
}

//endpoints

server.get('/api/users', (req, res) => {
  userDB.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/users/:id', (req, res) => {
  userDB.getById(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts', (req, res) => {
  postDB.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts/:id', (req, res) => {
  postDB.getById(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.post('/api/posts/:id', (req, res) => {
  if (req.params.id) {
    console.log(req.body)
    postDB.insert(req.body)
    .then(response => {
      console.log(response)
      res.status(200).json({ message: "Succesfully posted" })
    })
    .catch(error => {
      res.status(400).json(error)
    })
} else {
  res.status(400).json({ message: "error posting text" })
}

})

module.exports = server;
