var socket;
var connectedPlayers = 0;
var serverPipes = [];

function socketConnection() {
  socket = io.connect('http://localhost:3000');
  socket.on('totalUsers', setUsers);
  socket.on('serverPipesUpdated', setNewServerPipes);
}

function setNewServerPipes(data) {
  for (var i = 0; i < data.length; i++) {
    serverPipes[i] = setPipeData(data[i]);
  }
}
function setUsers(data) {
  connectedPlayers = data;
}
