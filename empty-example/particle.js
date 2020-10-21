// A simple Particle class
let Particle = function(position, a, r, l) {
  this.acceleration = createVector(0, 0.05);
  this.acceleration.rotate(a);
  this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0));
  this.position = position.copy();
  this.initPos = position.copy();
  this.lifespan = l;
  this.r = r;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position = this.initPos.copy().sub(ship.position.copy());
  this.initPos.add(this.velocity);
  this.lifespan -= 6;
  this.r += 0.1;
};

// Method to display
Particle.prototype.display = function() {
  strokeWeight(0);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, this.r, this.r);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(origin, a, r, l) {
  this.particles.push(new Particle(origin, a, r, l));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};