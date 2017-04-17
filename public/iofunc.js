var socket;
var totalPlayers = 0;
var serverPipes = [];
var serverPlayers = [];
var id = 'no-id';
function socketConnection() {
  socket = io.connect('http://192.168.1.8:3000');
  socket.on('birdUpById', birdUpId);
  socket.on('totalUsers', setUsers);
  socket.on('serverPipesUpdated', setNewServerPipes);
  socket.on('serverPlayersUpdated', setNewPlayers);
  socket.on('needPlayerData', setIdClient);
  socket.on('setPlayerStateDeath', setPlayerStateDeath);
  bird.collectPlayerData(true);
  socket.on('resetOtherPlayer', resetBirdForPlayer);
}


function setNewServerPipes(data) {
  for (var i = 0; i < data.length; i++) {
    serverPipes[i] = setPipeData(data[i]); //pipe.js
  }
}
function setNewPlayers(data) {
  serverPlayers = [];
  for (var i = 0; i < data.length; i++) {
    // console.log(socket.id + ' ' + data[i].id);
    if (data[i].id !== socket.id) {
      serverPlayers[i] = setPlayerData(data[i]);
    }
  }
  if (data.antiloop) {
    bird.collectPlayerData(false);
  }
}
function setIdClient(data) {

  id = data;
  bird.id = id;
   //bird.js
}
function setPlayerStateDeath(data) {
  for (var i = 0; i < serverPlayers.length; i++) {
    if (serverPlayers[i].id === data.id) {
      serverPlayers[i].gameover = data.bool;
      break;
    }
  }
}
function resetBirdForPlayer(id) {
  for (var i = 0; i < serverPlayers.length; i++) {
    if (serverPlayers[i].id === id) {
      serverPlayers[i].resetBird();
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
