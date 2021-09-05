'use strict';

const express = require('express');
const router = express.Router();
const {product} = require('../auth/models/index');


const bearerAuth = require('../auth/middleware/bearer.middle')
const permissions = require('../auth/middleware/acl.middle')



router.get('/products',bearerAuth, getAllProducts);
router.post('/products',bearerAuth,permissions('create'),createProduct);
router.put('/products/:id',bearerAuth,permissions('update'), updateProduct);
router.delete('/products/:id',bearerAuth, permissions('delete'),deleteProduct);


 async function getAllProducts(req, res) {

    let products = await product.read();
    res.status(200).json(products);
}


async function createProduct(req, res) {
    let newProduct = req.body;
    let products = await product.create(newProduct);
    res.status(200).json(products);
}


async function updateProduct(req, res) {
    let id=req.params.id
    let updateProduct = req.body;
    let products = await product.update(id,updateProduct);
    res.status(200).json(products);
}


async function deleteProduct(req, res) {
    let id=req.params.id
    await product.delete(id);
    res.status(200).json('Delete is Done ....!!!');
}
  
  module.exports = router; 
