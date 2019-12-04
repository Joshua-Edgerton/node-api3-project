const express = require('express');
const server = express();
const userDB = require('./users/userDb')
const postDB = require('./posts/postDb')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//middleware
server.use(express.json());

function logger(req, res, next) {
  console.log(req.method, req.url, `${new Date().toISOString()}`)
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  userDB
    .getById(id)
    .then(userId => {
      if (userId) {
        userId = req.user;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid user id" });
      }
    })
    .catch(error => {
      console.log(
        res
          .status(500)
          .json({ error: "Error validating the user id" })
      );
    });
}

function validateUser(req, res, next) {
  const user = req.body;

  if (!user) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!user.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const posts = req.body;

  if (!posts.user_id) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!posts.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

//endpoints

server.get('/api/users', logger, (req, res) => {
  userDB.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/users/:id', logger, validateUserId, (req, res) => {
  userDB.getById(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts', logger, (req, res) => {
  postDB.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.get('/api/posts/:id', logger, validateUserId, (req, res) => {
  postDB.getById(req.params.id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(400).json(error)
    })
})

server.post('/api/posts/:id', logger, validatePost, (req, res) => {
  if (req.params.id) {
    postDB.insert(req.body)
    .then(response => {
      res.status(200).json({ message: "Succesfully posted", response })
    })
    .catch(error => {
      res.status(400).json({ message: "invalid ID" })
    })
} else {
  res.status(400).json({ message: "Error posting text" })
}
})

server.post('/api/users/', logger, validateUser, (req, res) => {

    postDB.insert(req.body)
    .then(response => {
      res.status(200).json({ message: "Succesfully posted" })
    })
    .catch(error => {
      res.status(400).json({ message: "error posting text" })
    })
})

module.exports = server;
