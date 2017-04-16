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
  for (var i = 0; i < 100; i++) {
    serverPipes.push()
  }

  socket.on('disconnect', stopConnection);


  function addPipe() {

  }
  function stopConnection() {
    connected--;
    io.emit('totalUsers', connected);
  }

}
