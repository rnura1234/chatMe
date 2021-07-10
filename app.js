const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);


const publicPath=path.join(__dirname,'public');
app.use(express.static(publicPath));



app.get('/', (req, res) => {
  res.sendFile('index.html');
});


const port = 8000;
server.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});