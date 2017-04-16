// SERVER JS
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);

var connected = 0;

io.sockets.on('connection', newConnection);
io.sockets.on('disconnect', stopConnection);
function newConnection(socket) {
  connected++;
  io.emit('totalUsers', connected);
  console.log('new connection!');
}
function stopConnection() {
  connected--;
  io.emit('totalUsers', connected);
}
