const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


//server code 
io.on('connection', (socket) => {
  console.log('a user just connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});
const publicPath=path.join(__dirname,'public');
app.use(express.static(publicPath));

const port = 8000;
server.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});