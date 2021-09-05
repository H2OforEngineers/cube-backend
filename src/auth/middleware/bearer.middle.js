'use strict';

const { users } = require('../models')
const base64 = require('base-64');
module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    console.log("req.token ",req.token )
    req.id=validUser.id;
    req.username =validUser.username;
    req.password=validUser.password
    console.log("req.id",req.id);
    console.log(" req.username ", req.username )
    console.log(" req.password ", req.password )
    console.log('req.body',req.body);
    
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}