const jwt = require('jsonwebtoken');
const User = require('../models/User');

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'himanshu', async (err, decodedToken) => {
      if (err) {
        req.body.id = null;
        next();
      } else {
        req.body.id = decodedToken.id;
        next();
      }
    });
  } else {
    req.body.id = null;
    next();
  }
};

module.exports = { checkUser };