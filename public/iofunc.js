var socket;
var totalPlayers = 0;
var serverPipes = [];
var serverPlayers = [];

function socketConnection() {
  socket = io.connect('http://localhost:3000');
  socket.on('totalUsers', setUsers);
  socket.on('serverPipesUpdated', setNewServerPipes);
  socket.on('serverPlayersUpdated', setNewPlayers);
  collectPlayerData(bird); //bird.js
}


function setNewServerPipes(data) {
  for (var i = 0; i < data.length; i++) {
    serverPipes[i] = setPipeData(data[i]); //pipe.js
  }
}
function setNewPlayers(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id !== socket.id) {
      serverPlayers[i] = setPlayerData(data[i]); //bird.js
    }
  }
}
function setUsers(data) {
  totalPlayers = data;
}
