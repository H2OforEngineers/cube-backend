'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const router = express.Router();
const { users } = require('../auth/models');
const basicAuth = require('../auth/middleware/basic.middle');
const bearerAuth = require('../auth/middleware/bearer.middle');
const permissions = require('../auth/middleware/acl.middle');

router.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log('userRecord--------->', userRecord);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

// ================================ only for the admin
router.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user);
  res.status(200).json(list);
});



module.exports = router;



