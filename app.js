// SERVER JS
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);

var connected = 0;

var serverPipes = [];


io.sockets.on('connection', newConnection);
function newConnection(socket) {
  connected++;
  io.emit('totalUsers', connected);
  console.log('new connection!');

  socket.on('disconnect', stopConnection);
  socket.on('newPipe', addPipe);


  function addPipe(data) {
    serverPipes.push(data);
    io.broadcast.emit('serverPipesUpdated', serverPipes);
  }
  function stopConnection() {
    connected--;
    io.emit('totalUsers', connected);
  }

}
