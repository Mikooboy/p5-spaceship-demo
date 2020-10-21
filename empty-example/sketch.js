var ship;

var scale1 = 1.5;
var scale2 = 1.25;
var scale3 = 1;

var stars = [];
var stars2 = [];
var stars3 = [];

var boost = [];
var particle;
var bombs = [];
var missiles = [];

var originX;
var originY;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  rectMode(CENTER);
  angleMode(DEGREES);

  originX = -width/2;
  originY = -height/2;

  ship = new Ship();

  for (var i = 0; i < 100; i++) {
    stars[i] = new Star(originX + random(width), originY + random(height));
  }

  for (var i = 0; i < 75; i++) {
    stars2[i] = new Star(originX + random(width), originY + random(height));
  }

  for (var i = 0; i < 50; i++) {
    stars3[i] = new Star(originX + random(width), originY + random(height));
  }

  particle = new ParticleSystem(createVector(0, 0));
}

function draw() {
  // put drawing code here
  stroke(255);
  fill(255);
  background(1);
  angleMode(DEGREES);

  originX = ship.position.x - width/2;
  originY = ship.position.y - height/2;

  translate(width/2, height/2); 

  push();
  scale(scale1);
  fill(255);
  for (var i = stars.length-1; i >= 0; i--) {
    stars[i].update();
    stars[i].show();
    isOff = stars[i].offscreen();
    if (isOff[0]) {
      stars.splice(i, 1);
      switch (isOff[1]) {
        case 1:
          stars[stars.length] = new Star(originX + width, originY + random(height));
        break;
        
        case 2:
          stars[stars.length] = new Star(originX, originY + random(height));
        break;

        case 3:
          stars[stars.length] = new Star(originX + random(width), originY + height);
        break;

        case 4:
          stars[stars.length] = new Star(originX + random(width), originY);
        break;

        default:
        break;
      }
    }
  }
  pop();

  push();
  scale(scale2);
  fill(255);
  for (var i = stars2.length-1; i >= 0; i--) {
    stars2[i].update();
    stars2[i].show();
    isOff = stars2[i].offscreen();
    if (isOff[0]) {
      stars2.splice(i, 1);
      switch (isOff[1]) {
        case 1:
          stars2[stars2.length] = new Star(originX + width, originY + random(height));
        break;
        
        case 2:
          stars2[stars2.length] = new Star(originX, originY + random(height));
        break;

        case 3:
          stars2[stars2.length] = new Star(originX + random(width), originY + height);
        break;

        case 4:
          stars2[stars2.length] = new Star(originX + random(width), originY);
        break;

        default:
        break;
      }
    }
  }
  pop();

  push();
  scale(scale3);
  fill(255);
  for (var i = stars3.length-1; i >= 0; i--) {
    stars3[i].update();
    stars3[i].show();
    isOff = stars3[i].offscreen();
    if (isOff[0]) {
      stars3.splice(i, 1);
      switch (isOff[1]) {
        case 1:
          stars3[stars3.length] = new Star(originX + width, originY + random(height));
        break;
        
        case 2:
          stars3[stars3.length] = new Star(originX, originY + random(height));
        break;

        case 3:
          stars3[stars3.length] = new Star(originX + random(width), originY + height);
        break;

        case 4:
          stars3[stars3.length] = new Star(originX + random(width), originY);
        break;

        default:
        break;
      }
    }
  }
  pop();

  push();
  scale(scale1);
  fill(255);
  for (var i = boost.length-1; i >= 0; i--) {
    boost[i].update();
    boost[i].show();
    if (boost[i].timer()) {
      boost.splice(i, 1);
    }
  }
  pop();

  push();
  scale(scale1);
  particle.run();
  pop();

  push();
  scale(scale1);
  for (var i = bombs.length-1; i >= 0; i--) {
    bombs[i].update();
    bombs[i].show();
    if (bombs[i].delete()) {
      bombs.splice(i, 1);
    }
  }
  pop();

  push();
  scale(scale1);
  for (var i = missiles.length-1; i >= 0; i--) {
    missiles[i].update();
    missiles[i].show();
    if (missiles[i].delete()) {
      missiles.splice(i, 1);
    }
  }
  pop();
  
  push();
  rotate(ship.a);
  ship.update();
  ship.show();
  pop();

  textSize(16);
  fill(255);
  stroke(0);
  text("X: " + floor(ship.position.x), -windowWidth/2 + 20, -windowHeight/2 + 40);
  text("Y: " + floor(ship.position.y), -windowWidth/2 + 20, -windowHeight/2 + 66);
  text("Velocity: " + floor(ship.velocity.mag()), -windowWidth/2 + 20, -windowHeight/2 + 92);
  text("fps: " + floor(frameRate()), -windowWidth/2 + 20, -windowHeight/2 + 118);
}