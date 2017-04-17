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
  socket.broadcast.emit('requestData');
  if (storedPipes.length > 0) {
    io.to(socket.id).emit('serverPipesUpdated', storedPipes);
  }
  io.to(socket.id).emit('needPlayerData', socket.id);
  // if (connectedPlayers.length > 0) {
  //   io.to(socket.id).emit('serverPlayersUpdated', connectedPlayers);
  // }
  // socket.broadcast.to(socket.id).emit('setId', socket.id);
  connected++;
  io.emit('totalUsers', connected);
  console.log('new connection!');

  socket.on('disconnect', stopConnection);
  socket.on('newPipe', addPipe);
  socket.on('newPlayer', addPlayer);
  socket.on('playerUp', playerPressUp);
  socket.on('playerDied', playerDeathState);
  socket.on('resetBird', resetBirds);


  function addPipe(data) {
    storedPipes.push(data);
    io.emit('serverPipesUpdated', storedPipes);
  }
  function modifyPlayerData(data) {
    for (var i = 0; i < connectedPlayers.length; i++) {
      if (connectedPlayers[i].id === data.id) {
        connectedPlayers[i] = data;
      }
    }
  }
  function addPlayer(data) {
    data.id = socket.id;
    connectedPlayers.push(data);
    io.emit('serverPlayersUpdated', connectedPlayers);
    console.log(connectedPlayers);
  }
  function playerPressUp(data) {
    socket.broadcast.emit('birdUpById', data);
  }
  function playerDeathState(data) {
    socket.broadcast.emit('setPlayerStateDeath', data);
  }
  function resetBirds(data) {
    socket.broadcast.emit('resetOtherPlayer', data);
  }
  function stopConnection(data) {
    connected--;
      for (var i = connectedPlayers.length - 1; i >= 0; i--) {
        if (connectedPlayers[i].id === socket.id) {
          connectedPlayers.splice(i, 1);
          break;
        }
      }
    io.emit('serverPlayersUpdated', connectedPlayers);
    io.emit('totalUsers', connected);
  }

}
