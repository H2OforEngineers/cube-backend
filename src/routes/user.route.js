'use strict'
const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const router = express.Router();
const { users } = require('../auth/models');
const basicAuth = require('../auth/middleware/basic.middle')
const bearerAuth = require('../auth/middleware/bearer.middle')
const permissions = require('../auth/middleware/acl.middle')

router.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    console.log('userRecord--------->', userRecord);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});


router.get('/users', bearerAuth, permissions("delete"), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user);
  res.status(200).json(list);
});



// router.put('/users/:id', bearerAuth, permissions("update"), async(req, res) => {
 
//   const id = req.id;
//    console.log('req.body.password',req.body.password);
//    let hashedPass = await bcrypt.hash(req.body.password, 10);
//    req.body.password = hashedPass;
//    console.log('req.body.password after',req.body.password);
//   try{
//     let recordById = await users.findOne({where: {id}}); 
//     let updated = await recordById.update(req.body);
//     res.status(200).send('you account has been updated  ! ')
// } catch(e) {
//     console.error('error updating the record for model: ', `id: ${id}`)
// }
// });


// router.delete('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
//   let id = req.params.id;
//   let deletedRecord = await users.findOne({id:id});
//   let empty = deletedRecord.destroy()
//   res.status(200).json("account deleted successfully");
// });


module.exports = router;



