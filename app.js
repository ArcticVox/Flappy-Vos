// SERVER JS
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);

var connected = 0;

var storedPipes = [];


io.sockets.on('connection', newConnection);
function newConnection(socket) {
  connected++;
  io.emit('totalUsers', connected);
  if (storedPipes.length > 0) {
    io.to(socket.id).emit('serverPipesUpdated', storedPipes);
  }
  console.log('new connection!');

  socket.on('disconnect', stopConnection);
  socket.on('newPipe', addPipe);


  function addPipe(data) {
    storedPipes.push(data);
    io.emit('serverPipesUpdated', storedPipes);
  }
  function stopConnection() {
    connected--;
    io.emit('totalUsers', connected);
  }

}
