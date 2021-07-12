var socket = io();

socket.on('connect', () => {
  console.log('connected from the server');
  
});
socket.on('disconnect', () => {
  console.log('disconnected from the server');
});

socket.on('newMessage', (message) => {
  console.log('newMessage',message);
});