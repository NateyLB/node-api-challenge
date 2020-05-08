const express = require('express');
const cors = require('cors');

const actionRouter = require('./actions/actionRouter.js');
const projectRouter = require('./projects/projectRouter.js');

const server = express();

//global middleware
server.use(express.json());
server.use(cors());
server.use(logger);
server.use('/actions', actionRouter );
server.use('/projects', projectRouter );


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });
  
  //custom middleware
  
  function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );
    next();
}

module.exports = server;
