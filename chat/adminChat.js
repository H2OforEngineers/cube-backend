'use strict';

const client = require('socket.io-client');
const host = 'http://localhost:8080/chat';

const socket = client.connect(host);
const value = process.argv.splice(2)[0];
// pulling msgs 
socket.emit('get_all_admin');
socket.emit('new_response', value);

socket.on('response', msg=> {
  console.log('User message', msg);
  socket.emit('admin_received', msg);
});

socket.on('admin_response', payload=> {
  console.log('Your response have been send ', payload , ' to the user');
  socket.disconnect();
});
