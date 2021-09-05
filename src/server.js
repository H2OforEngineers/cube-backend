'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
app.use(productRouter);
app.use(userRouter);

const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');

app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send('im live =====================');
});

const start=(port)=>{
  app.listen(port,()=>console.log(`listening to port :  ${port}` ));
};


app.use('*', notFound);
app.use(errorHandler);



module.exports={
  start:start,
  app:app,
};