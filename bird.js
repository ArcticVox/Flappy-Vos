function Bird(img) {
  this.x = 50;
  this.y = height/2;
  this.img = img;

  this.gravity = width * 0.002;
  this.velocity = 0;
  this.lift = width * 0.05;
  this.r = width * 0.05;

  this.rotation = 0;

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
  this.up = function() {
    this.velocity -= this.lift;
    var rng = floor(random(vosSound.length));
    if (vosSound[rng].isLoaded()) {
      vosSound[rng].play();
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
