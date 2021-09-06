'use strict';

const express = require('express');
const router = express.Router();
// const {product} = require('../auth/models/index');
const dataModules = require('../auth/models/index');


const bearerAuth = require('../auth/middleware/bearer.middle');
const permissions = require('../auth/middleware/acl.middle');

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

//get all 
router.get('/:model',bearerAuth, getAllProducts);

//get product by ID
router.get('/:model/:id',bearerAuth, permissions('read'), getOneProducts);

router.post('/:model',bearerAuth,permissions('create'),createProduct);
router.put('/:model/:id',bearerAuth,permissions('update'), updateProduct);
router.delete('/:model/:id',bearerAuth, permissions('delete'),deleteProduct);


async function getAllProducts(req, res) {
  let products = await req.model.read();
  res.status(200).json(products);
}


async function getOneProducts(req, res) {
  try {
    const id = req.params.id;
    let product = await req.model.read(id)
    res.status(200).json(product);
  }catch(err) {
    throw new Error(err.message)
  }
}

async function createProduct(req, res) {
  let newProduct = req.body;
  let products = await req.model.create(newProduct);
  res.status(200).json(products);
}


async function updateProduct(req, res) {
  let id=req.params.id;
  let updateProduct = req.body;
  let products = await req.model.update(id,updateProduct);
  res.status(200).json(products);
}


async function deleteProduct(req, res) {
  let id=req.params.id;
  await req.model.delete(id);
  res.status(200).json('Delete is Done ....!!!');
}
  





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
module.exports = router; 
