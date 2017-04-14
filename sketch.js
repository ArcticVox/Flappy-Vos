var bird;
var pipes = [];
// var ai;
var score = 0;
var highscore = 0;
var gameover = false;
var canRestart = false;
var endtop = 0;

var volume = 0;

var voskop;
var voskopded;
var voskopyey;
var pipePass;
var dedSounds = [];
var vosSound = [];
var litEmoji;
var scoreIcon;
function preload() {
  voskop = loadImage('assets/images/voskop.png');
  voskopded = loadImage('assets/images/voskopded.png');
  voskopyey = loadImage('assets/images/voskopyey.png');
  litEmoji = loadImage('assets/images/lit.png');
  scoreIcon = loadImage('assets/images/voscoin.png');
  pipePass = loadSound('assets/sounds/noice.mp3');
  dedSounds[0] = loadSound('assets/sounds/bob.mp3');
  dedSounds[1] = loadSound('assets/sounds/jammerman.mp3');
  dedSounds[2] = loadSound('assets/sounds/dieisdood.mp3');

  vosSound[0] = loadSound('assets/sounds/vosounds/vos1.mp3');
  vosSound[1] = loadSound('assets/sounds/vosounds/vos2.mp3');
  vosSound[2] = loadSound('assets/sounds/vosounds/vos3.mp3');
  vosSound[3] = loadSound('assets/sounds/vosounds/vos5.mp3');
  vosSound[4] = loadSound('assets/sounds/vosounds/vos6.mp3');
  vosSound[5] = loadSound('assets/sounds/vosounds/vos7.mp3');
}


function setup() {
  if (window.innerWidth <= 600) {
    createCanvas(window.innerWidth, window.innerHeight);
  } else {
    createCanvas(400, 600);
  }
  bird = new Bird(voskop);
  // ai = new Ai();
  endtop = -(height * 0.4) - 100;
}

function draw() {
  background(120);
  noStroke();
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    if (!gameover) {
      pipes[i].update();
      if (pipes[i].hits(bird)) {
        gameover = true;

        dedSounds[floor(random(dedSounds.length))].play();
      }
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
  }
  if (!gameover) {
    bird.update();
    // ai.control(bird, pipes);
  }
  bird.show();

  if (!gameover && frameCount % 100 == 0) {
    pipes.push(new Pipe(0.05 * score, litEmoji));
  }
  if (gameover) {
    endtop = lerp(endtop, height * 0.3, 0.2);
    bird.img = voskopded;
    bird.r = 40;
    if (endtop > (height * 0.3) - 5) {
      canRestart = true;
    }
    push();
    fill(230);
    pop();
  } else {
    endtop = lerp(endtop, -(height * 0.4) - 100, 0.2);
  }
  rect(width * 0.25, endtop, width/2, height * 0.4);
  push();
  textAlign(CENTER);
  fill(0);
  textSize(28);
  text("druk knop.", width * 0.25, endtop + 50, width/2, height * 0.15);
  textSize(18);
  text("Лорем ипсум долор сит амет", width * 0.25, endtop + height * 0.2 + 25, width/2, height * 0.2);
  pop();

  push();
  textSize(14);
  text('Highscore: ' + highscore, 4, 16);
  pop();
  textSize(50);
  var scoretw = textWidth(score.toString());
  translate(-((scoreIcon.width * 0.2) + scoretw) / 2, 0);
  image(scoreIcon, width/2 - scoreIcon.width * 0.2, 30, scoreIcon.width * 0.4, scoreIcon.height * 0.4);
  text(score, width/2 + scoreIcon.width * 0.2, 75);
}


function keyPressed() {
  if (canRestart && gameover) {
    gameover = false;
    canRestart = false;
    pipes = [];
    bird = new Bird(voskop);
    score = 0;
  }
  if (!gameover && key === ' ') {
    bird.up();
    // bang.play();
    vosSound[floor(random(vosSound.length))].play();
  }
}
