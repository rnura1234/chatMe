const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage,generateLocationMessage} = require('./utils/message');




const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

const port = 8000;
server.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});

//SERVER CODE FOR SOCKET.IO
io.on('connection', (socket) => {
  console.log('a user just connected');
  
  socket.emit('newMessage', generateMessage('Admin','welcome to chat app !'));
 
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new User joined in chat app'));

  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });
    
  socket.on('createLocationMessage', (coord) => {
    io.emit('newLocationMessage', generateLocationMessage("User",coord.lat,coord.lng));
  });
  
  
  


  socket.on('disconnect', () => {
    console.log(' A user disconnected');
  });

});