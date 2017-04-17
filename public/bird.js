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
  this.currentLocation = 0;
  this.isOtherPlayer = false;
  this.show = function() {
    push();
    // ellipse(this.x, this.y, this.r*2, this.r*2);
    if (this.isOtherPlayer) {
      translate(this.relativeLocation - bird.currentLocation, 0);
    }

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
    if (bool) {
      if (vosSound[rng].isLoaded()) {
        vosSound[rng].play();
      }
      socket.emit('playerUp', bird.id);
    }
  }
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.rotation = map(this.velocity, -20, 20, -45, 45);
    if (this.isOtherPlayer) {
      this.relativeLocation += this.relativeSpeed;
    }
    if (!this.isOtherPlayer) {
      this.currentLocation += this.relativeSpeed;
    }

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
  this.resetBird = function() {
    if (!this.isOtherPlayer) {
      socket.emit('resetBird', this.id);
    }
    this.y = height/2;
    this.gameover = false;
    this.velocity = 0;
    this.r = width * 0.05;
    this.rotation = 0;
    this.relativeLocation = 0;
    this.currentLocation = 0;
    this.img = voskop;
  }
  this.collectPlayerData = function(bool) {
    var data = {
      relativeLocation: this.relativeLocation,
      currentLocation: this.currentLocation,
      y: this.y,
      velocity: this.velocity,
      gameover: this.gameover,
      id: this.id,
      antiloop: bool
    }
    socket.emit('newPlayer', data);
  }
}


function setPlayerData(data) {
  var playerWithSetData = new Bird(voskop, data.id);
  playerWithSetData.relativeLocation = data.currentLocation;

  var cy = playerWithSetData.y / data.y; //converted Y
  playerWithSetData.y = data.y * cy;
  if (playerWithSetData.velocity != 0 || data.velocity != 0) {
    var cv = playerWithSetData.velocity / data.velocity; //converted Velocity
    playerWithSetData.velocity = data.velocity * cv;
  } else {
    playerWithSetData.velocity = data.velocity;
  }

  playerWithSetData.gameover = data.gameover;
  playerWithSetData.isOtherPlayer = true;
  return playerWithSetData;
}
