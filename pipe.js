function Pipe(spd, img) {
  this.spacing = random(height * 0.20, height * 0.30);
  this.top = random(20, height/2);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = width * 0.125;
  this.speed = (width * 0.0075) + spd;
  this.highlight = false;
  this.swap = false;
  this.passed = false;
  this.pipeImage = img;
  this.pipeImageHeight = (this.w / this.pipeImage.width) * this.pipeImage.height;
  this.topcars = ceil(this.top / this.pipeImageHeight);
  this.bottomcars = ceil(this.bottom / this.pipeImageHeight);

  this.hits = function(bird) {
    if (bird.y < this.top + bird.r || bird.y > height - this.bottom - bird.r) {
      if (bird.x > this.x - bird.r && bird.x < this.x + this.w + bird.r) {
        this.highlight = true;
        return true;
      }
    }
    if (!this.passed && bird.x > this.x + this.w) {
      this.passed = true;
      score ++;


      // vos change on score
      // if (score % 2 === 0 ) {
      //     bird.img = voskopemoji;
      //   } else {
      //     bird.img = voskopemoji2;
      //   }

      if (score > highscore) {
        highscore = score;
      }
      if (pipePass.isLoaded()) {
        pipePass.play();
      }
    }
    this.highlight = false;
    return false;
  }
  this.show = function() {

    // rect(this.x, 0, this.w, this.top);
    for (var i = 0; i < this.topcars; i++) {
      image(this.pipeImage, this.x, this.top - (this.pipeImageHeight * (i + 1)), this.w, this.pipeImageHeight);
    }

    // rect(this.x, height - this.bottom, this.w, this.bottom);
    for (var i = 0; i < this.bottomcars; i++) {
      image(this.pipeImage, this.x, (height - this.bottom) + (this.pipeImageHeight*i), this.w, this.pipeImageHeight);
    }

  }
  this.update = function() {
    this.x -= this.speed;
    // this.speed = map(score, 0, 50, 2, 20);
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }

  }
}
