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

router.get('/:model',bearerAuth, getAllProducts);
router.post('/:model',bearerAuth,permissions('create'),createProduct);
router.put('/:model/:id',bearerAuth,permissions('update'), updateProduct);
router.delete('/:model/:id',bearerAuth, permissions('delete'),deleteProduct);


async function getAllProducts(req, res) {
  let products = await req.model.read();
  res.status(200).json(products);
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
  
module.exports = router; 
