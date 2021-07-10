const socket = io();

socket.on('connect', () => {
  console.log('connect from the server');
});
  