var socket = io();

socket.on('connect', () => {
  console.log('connected from the server');
  
});
socket.on('newMessage', (message) => {
 
  const li = document.createElement('li');
  li.innerText = `${message.from} :${message.text}`;
  document.querySelector('.chat__message--list').appendChild(li);

});

socket.on('newLocationMessage', (message) => {
  const a = document.createElement('a');
  const li = document.createElement('li');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  a.innerText = 'Show My Location';
  li.appendChild(a);
  document.querySelector('.chat__message--list').appendChild(li);

});

socket.on('disconnect', () => {
  console.log('disconnected from the server');
});




document.getElementById('submit-btn').addEventListener('click', (el) => {
  el.preventDefault();
  socket.emit('createMessage', {
    from: "user",
    text: document.getElementById('sendMessage').value
  });
});

document.getElementById('location-btn').addEventListener('click', () => {
 
  if (!navigator.geolocation) {
    console.log('Geolaction not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
   
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng:position.coords.longitude
    });


  }, function (error) {
    alert('Unable to fetch the location');
  })
});