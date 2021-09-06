'use strict';

const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const http = require('http'); //package or module 
const server = http.createServer(app);
const io = require('socket.io')(server);
app.use('/product',productRouter);
app.use(userRouter);



//=================================================

const path = require('path'); //node js core module to read    public file?

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const Queue = require('./utils/Queue');

// to save msg for the stream 
let msgQueue = new Queue();

app.get('/',(req,res)=>{
  res.send('im live =====================');
});

// Set static folder//i want public folder to set as static folder to access html pages (chat.html,index.html)
app.use(express.static(path.join(__dirname, './public'))); //after this we can open http//:localhost:300


const botName = 'Chat-App';
//=================================================

const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');

app.use(express.urlencoded({ extended: true }));


//=================================================
io.on('connection', socket => {
  console.log('new WS connection');
  socket.on('joinRoom', ({
    username,
    room,
  }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
  
    socket.emit('message', formatMessage(botName, 'Welcome to Chat-Stream!'));
  
  
    // let recollection = msgQueue.recall();
  
    // if (!msgQueue.isEmpty()) {
    //   while (recollection.length !== 0) {
    //     const {
    //       name,
    //       msg,
    //     } = recollection.shift();
    //     socket.emit('message', formatMessage(name, msg));
    //   }
    // }
  
    // Broadcast when a user connects
    //difference between socket.emit ==> for the single client //socket.broadcast.emit====> all clients except the client that connecting
    //and io.emit =====> for all clients . 
  
    socket.broadcast.to(user.room).emit('message',
      formatMessage(botName, `${user.username} has joined the chat`),
    );
  
    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
  
  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
  
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  
    msgQueue.enqueue({
      name: user.username,
      msg: msg,
    });
  
    console.log(msgQueue.printQueue());
  });
  
  //  client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
  
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`),
      );
  
      // Send users and room info" left"
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

//=================================================

app.use('*', notFound);
app.use(errorHandler);



const start=(port)=>{
  server.listen(port,()=>console.log(`listening to port :  ${port}` ));
};

module.exports={
  start:start,
  server:server,
};