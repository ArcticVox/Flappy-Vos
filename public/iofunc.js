var socket;
var totalPlayers = 0;
var serverPipes = [];
var serverPlayers = [];
var id = 'no-id';
function socketConnection() {
  socket = io.connect('http://192.168.1.8:3000');
  socket.on('birdUpById', birdUpId);
  collectPlayerData(bird); //bird.js
  socket.on('totalUsers', setUsers);
  socket.on('serverPipesUpdated', setNewServerPipes);
  socket.on('serverPlayersUpdated', setNewPlayers);
  socket.on('needPlayerData', setIdClient);
  socket.on('setPlayerStateDeath', setPlayerStateDeath);
  // socket.on('setId', setIdClient);
}


function setNewServerPipes(data) {
  for (var i = 0; i < data.length; i++) {
    serverPipes[i] = setPipeData(data[i]); //pipe.js
  }
}
function setNewPlayers(data) {
  serverPlayers = [];
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    // console.log(socket.id + ' ' + data[i].id);
    if (data[i].id !== socket.id) {
      serverPlayers[i] = setPlayerData(data[i]);
      console.log(data[i]); //bird.js
    }
  }
}
function setIdClient(data) {

  id = data;
  bird.id = id;
  console.log(id);
}
function setPlayerStateDeath(data) {
  for (var i = 0; i < serverPlayers.length; i++) {
    if (serverPlayers[i].id === data.id) {
      serverPlayers[i].gameover = data.bool;
      break;
    }
  }
}
function birdUpId(data) {
  for (var i = 0; i < serverPlayers.length; i++) {
    if (serverPlayers[i].id === data) {
      serverPlayers[i].up(false);
      break;
    }
  }
}
function setUsers(data) {
  totalPlayers = data;
}
