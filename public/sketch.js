var socket;

var bird;
var pipes = [];
var mobile = false;
var textResponsive = [];
var textResponsiveWH = [];
var firsttap = true;

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
var gameoverMsg = "jammer man";
function preload() {
  voskop = loadImage('assets/images/voskop.png');
  voskopded = loadImage('assets/images/voskopded.png');
  voskopyey = loadImage('assets/images/voskopyey.png');
  litEmoji = loadImage('assets/images/lit.png');
  scoreIcon = loadImage('assets/images/voscoin.png');
}


function setup() {
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
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    createCanvas(window.innerWidth, window.innerHeight);
    document.body.addEventListener('touchmove',function(e){
        e.preventDefault();
    });
    mobile = true;
    textResponsive[0] = window.innerWidth * 0.07;
    textResponsive[1] = textResponsive[0] * 0.67;
    textResponsive[2] = textResponsive[0] * 0.5;
    textResponsive[3] = textResponsive[0] * 1.78;
    textResponsiveWH[0] = window.innerWidth * 0.16;
    textResponsiveWH[1] = window.innerWidth * 0.20;
    textResponsiveWH[2] = window.innerWidth / 1.5;
    textResponsiveWH[3] = window.innerWidth * 0.60;
    document.getElementById('website').innerHTML = "www.arcticvox.com - geen audio op iphone, want apple houd niet van koele tjoens.";
  } else {
    createCanvas(400, 600);
    textResponsive[0] = 28;
    textResponsive[1] = 18;
    textResponsive[2] = 14;
    textResponsive[3] = 50;
    textResponsiveWH[0] = width * 0.25;
    textResponsiveWH[1] = width * 0.25;
    textResponsiveWH[2] = width / 2;
    textResponsiveWH[3] = width / 2;
  }
  bird = new Bird(voskop);
  // ai = new Ai();
  endtop = -(height * 0.4) - 100;
  socket = io.connect('http://localhost:3000');
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
        var rng = floor(random(dedSounds.length));
        if (dedSounds[rng].isLoaded()) {
          dedSounds[rng].play();
        }
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
    pipes.push(new Pipe((width * 0.000125) * score, litEmoji));
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

  rect(textResponsiveWH[0], endtop, textResponsiveWH[2], height * 0.4);
  push();
  textAlign(CENTER);
  fill(0);
  textSize(textResponsive[0]);


  //death screen
  if(score == 0){
    gameoverMsg = "Echt waar? 0 punten?!?" + "😂";
  }
  else if(score < 9){
    gameoverMsg = "Alweer onder de 10?? ";
  }

  else{
    gameoverMsg = "Je score is " + score;
  }

  text(gameoverMsg, textResponsiveWH[1], endtop + 50, textResponsiveWH[3], height * 0.15);
  textSize(textResponsive[1]);
  text("Лорем ипсум долор сит амет", textResponsiveWH[1], endtop + height * 0.2 + 25, textResponsiveWH[3], height * 0.2);
  pop();

  push();
  textSize(textResponsive[2]);
  text('Highscore: ' + highscore, 4, 16);
  pop();
  textSize(textResponsive[3]);
  var scoretw = textWidth(score.toString());
  translate(-((scoreIcon.width * 0.2) + scoretw) / 2, 0);
  image(scoreIcon, width/2 - scoreIcon.width * 0.2, scoreIcon.height * 0.4 + 10, scoreIcon.width * 0.4, scoreIcon.height * 0.4);
  text(score, width/2 + scoreIcon.width * 0.2, scoreIcon.height * 0.4 + 50);
}


function keyPressed() {
  restart();
  if (!gameover && key === ' ') {
    bird.up();
  }
}

function touchStarted() {

  restart();
  if (!gameover) {
    bird.up();
  }
}
function restart() {
  if (canRestart && gameover) {
    gameover = false;
    canRestart = false;
    pipes = [];
    bird = new Bird(voskop);
    score = 0;
  }
}
