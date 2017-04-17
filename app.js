// SERVER JS
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);

var connected = 0;

var storedPipes = [];
var connectedPlayers = [];


io.sockets.on('connection', newConnection);
function newConnection(socket) {
  if (storedPipes.length > 0) {
    io.to(socket.id).emit('serverPipesUpdated', storedPipes);
  }
  if (connectedPlayers.length > 0) {
    io.to(socket.id).emit('serverPlayersUpdated', connectedPlayers);
  }
  connected++;
  io.emit('totalUsers', connected);
  console.log('new connection!');

  socket.on('disconnect', stopConnection);
  socket.on('newPipe', addPipe);
  socket.on('newPlayer', addPlayer);


  function addPipe(data) {
    storedPipes.push(data);
    io.emit('serverPipesUpdated', storedPipes);
  }

  function addPlayer(data) {
    data.id = socket.id;
    connectedPlayers.push(data);
    io.emit('serverPlayersUpdated', connectedPlayers);
  }

  function stopConnection() {
    connected--;
    io.emit('totalUsers', connected);
  }

}
