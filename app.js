const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);




const publicPath=path.join(__dirname,'public');
app.use(express.static(publicPath));

const port = 8000;
server.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});

//SERVER CODE FOR SOCKET.IO
io.on('connection', (socket) => {
  console.log('a user just connected');
  
  socket.emit('newMessage', {
    from: 'Server',
    text: 'welcome to chat app',
    createAt: new Date().getTime()
  });
 
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new User joined in chat app',
    createAt: new Date().getTime()
    
  })

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  });
  


  socket.on('disconnect', () => {
    console.log(' A user disconnected');
  });

});
