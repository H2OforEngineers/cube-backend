'use strict';


const client = require('socket.io-client');
const host = 'http://localhost:8080/chat';

const socket = client.connect(host);

// take the task value from argument form the terminal
// console.log(process.argv)
const value = process.argv.splice(2)[0];
console.log('value : ', value);
socket.emit('new_request', value);

socket.emit('get_all_user');
// socket.emit('new_chore', "wash the dishes");


socket.on('request', payload=> {
  console.log('Your request have been send ', payload , ' to the admin');
  socket.disconnect();
});


socket.on('responsing', msg=> {
  console.log('Admin message', msg);
  socket.emit('user_received', msg);
});
