function Pipe(img) {
  this.spacing = random(height * 0.20, height * 0.30);
  this.top = random(20, height/2);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = width * 0.125;
  this.speed = (width * 0.0075);
  this.passed = false;
  this.pipeImage = img;
  this.pipeImageHeight = (this.w / this.pipeImage.width) * this.pipeImage.height;
  this.topimages = ceil(this.top / this.pipeImageHeight);
  this.bottomimages = ceil(this.bottom / this.pipeImageHeight);

  this.hits = function(bird) {
    if (bird.y < this.top + bird.r || bird.y > height - this.bottom - bird.r) {
      if (bird.x > this.x - bird.r && bird.x < this.x + this.w + bird.r) {
        return true;
      }
    }
    if (!this.passed && bird.x > this.x + this.w) {
      this.passed = true;
      score ++;
      // bird.img = voskopyey;
      if (score > highscore) {
        highscore = score;
      }
      if (pipePass.isLoaded()) {
        pipePass.play();
      }
    }
    return false;
  }
  this.show = function() {

    for (var i = 0; i < this.topimages; i++) {
      image(this.pipeImage, this.x, this.top - (this.pipeImageHeight * (i + 1)), this.w, this.pipeImageHeight);
    }

    for (var i = 0; i < this.bottomimages; i++) {
      image(this.pipeImage, this.x, (height - this.bottom) + (this.pipeImageHeight*i), this.w, this.pipeImageHeight);
    }

  }
  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }

  }
}


function collectPipeData(pipe) {
  var data = {
    spacing: pipe.spacing,
    top: pipe.top,
    bottom: pipe.bottom,
    w: pipe.w,
    speed: pipe.speed,
    pipeImageHeight: pipe.pipeImageHeight,
    topimages: pipe.topimages,
    bottomimages: pipe.bottomimages
  }
  socket.emit('newPipe', data);

}

function setPipeData(data) {
  var pipeWithSetData = new Pipe(litEmoji);
  pipeWithSetData.spacing = data.spacing
  pipeWithSetData.top = data.top,
  pipeWithSetData.bottom = data.bottom,
  pipeWithSetData.w = data.w,
  pipeWithSetData.speed = data.speed,
  pipeWithSetData.pipeImageHeight = data.pipeImageHeight,
  pipeWithSetData.topimages = data.topimages,
  pipeWithSetData.bottomimages = data.bottomimages
  return pipeWithSetData;
}
