function Ai() {
  this.closest;
  this.ignore;
  this.control = function(bird, pipes) {
    if (this.closest !== undefined && this.closest.x + (this.closest.w * 2) <= bird.x) {
      this.ignore = this.closest;
    }
    for (var i = 0; i < pipes.length; i++) {
      if (this.closest !== undefined) {
        if (pipes[i] !== this.ignore) {
          if (bird.y > height - this.closest.bottom - (this.closest.spacing/3)) {
            console.log("up!");
            bird.up();
          }
        }



      } else {
        this.closest = pipes[i];
      }
    }
  }
}
