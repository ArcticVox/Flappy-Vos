function Bird(img, id) {
  this.x = 50;
  this.y = height/2;
  this.img = img;
  this.gameover = false;
  this.gravity = width * 0.002;
  this.velocity = 0;
  this.lift = width * 0.05;
  this.r = width * 0.05;
  this.rotation = 0;
  this.id = id;

  this.relativeSpeed = (width * 0.0075);
  this.relativeLocation = 0;
  this.show = function() {
    push();
    // ellipse(this.x, this.y, this.r*2, this.r*2);
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.rotation);
    translate(-this.r, -this.r);
    image(this.img, 0, 0, this.r*2, this.r*2);
    pop();
    fill(255);

  }
  this.up = function(bool) {
    this.velocity -= this.lift;
    var rng = floor(random(vosSound.length));
    if (vosSound[rng].isLoaded()) {
      vosSound[rng].play();
    }
    if (bool) {
      socket.emit('playerUp', bird.id);
    }
  }
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.rotation = map(this.velocity, -20, 20, -45, 45);

    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    this.velocity = constrain(this.velocity, -this.lift, this.lift);
  }
}


function collectPlayerData(bird) {
  var data = {
    relativeSpeed: bird.relativeSpeed,
    y: bird.y,
    velocity: bird.velocity,
    gameover: bird.gameover,
    id: bird.id
  }
  socket.emit('newPlayer', data);
}

function setPlayerData(data) {
  var playerWithSetData = new Bird(voskop, data.id);
  var crl = data.relativeLocation / playerWithSetData.relativeLocation; //converted relativeLocation
  playerWithSetData.relativeLocation = data.relativeLocation * crl;

  var cy = data.y / playerWithSetData.y; //converted Y
  playerWithSetData.y = data.y * cy;

  var cv = data.y / playerWithSetData.y; //converted Velocity
  playerWithSetData.velocity = data.velocity * cv;

  playerWithSetData.gameover = data.gameover;
  return playerWithSetData;
}
