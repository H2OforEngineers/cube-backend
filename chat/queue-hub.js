'use strict';

require('dotenv').config();
const uuid = require('uuid').v4;
// keep port in dotenv
const port = process.env.PORT || 8080;
const io = require('socket.io')(8080);
// can be stored in a database/ cache/ ...
// my queue is an object
// keyed queue

//  there will be no ordered preserved
const adminmsgQueue = {
  messages : {},
};

const usermsgQueue = {
  messages : {},
};

const family = io.of('/chat'); //namespace
family.on('connection', socket=> {
  console.log('CONNECTED', socket.id);
  console.log(`connect on port:${port}`);
  // when the parent adds a new chore
  socket.on('new_request', payload=> {
    console.log('adding a new request ....');
    const id = uuid();
    console.log('id ====> ', id);
    usermsgQueue.messages[id] = payload;
    socket.emit('request', payload); // telling the parent a task was added
    console.log('after add usermsgQueue ========> ', usermsgQueue);
  });

  socket.on('new_response', payload=> {
    console.log('adding a new response ....');
    const id = uuid();
    console.log('id ====> ', id);
    adminmsgQueue.messages[id] = payload;
    socket.emit('admin_response', payload); // telling the parent a task was added
    console.log('after add adminmsgQueue ========> ', adminmsgQueue);
  });

  socket.on('get_all_admin', ()=> {
    console.log('admin recived all the requests');
    Object.keys(usermsgQueue.messages).forEach(id=> {
      socket.emit('response', {id: id, payload: usermsgQueue.messages[id] });
    //   family.emit('response', {id: id, payload: adminmsgQueue.messages[id]});
    });
  });

  socket.on('get_all_user', ()=> {
    console.log('user recived all the respones');
    Object.keys(adminmsgQueue.messages).forEach(id=> {
      socket.emit('responsing', {id: id, payload: adminmsgQueue.messages[id] });
    });
  });

  socket.on('admin_received', msg => {
    console.log('received on queue will remove it ...');
    // he child confirmed receiving , remove from queue
    delete usermsgQueue.messages[msg.id];
    console.log('after delete usermsgQueue --------------->', usermsgQueue);
  });

  socket.on('user_received', msg => {
    console.log('received on queue will remove it ...');
    // he child confirmed receiving , remove from queue
    delete adminmsgQueue.messages[msg.id];
    console.log('after delete adminmsgQueue @@@@@@@@@@ ', adminmsgQueue);
  });
});
