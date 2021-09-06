
'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/index');
const server = require('./src/server');



db.sync().then(() => {
  server.start(process.env.PORT || 3000);
}).catch(e => {
  console.error('Could not start server', e.message);
});
