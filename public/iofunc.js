var socket;
var connectedPlayers = 0;

function socketConnection() {
  socket = io.connect('http://localhost:3000');
  socket.on('totalUsers', setUsers);
  socket.on('serverPipesUpdated', setNewServerPipes);
}

function setNewServerPipes(data) {
  
}
function setUsers(data) {
  connectedPlayers = data;
}
