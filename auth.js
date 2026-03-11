'use strict';

const jwt = require('jsonwebtoken');

// Middleware for JWT authentication and authorization
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = authenticateJWT;
