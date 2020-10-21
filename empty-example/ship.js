function Ship() {
    this.position = createVector(0, 1);
    this.velocity = createVector(0, -0.0001);
    this.a = 0;

    this.thrust = 0.25;
    this.maxVelocity = 6;
    this.turnSpeed = 3;
    this.friction = 0.05;
    this.bombCD = 0;
    this.missileCD = 0;
    this.target = createVector(0, -200);

    this.show = function() {
        fill(255);
        triangle(0, - 21, 0 - 11, 0 + 11, 0 + 11, 0 + 11);
    }

    this.forward = function() {
        this.velocity.setMag(this.velocity.mag() + this.thrust); 
        particle.addParticle(this.position, this.a, random(2, 6), 255);
        particle.addParticle(this.position, this.a, random(2, 6), 255);
    }

    this.backward = function() {
        if (this.velocity.mag() - this.thrust <= 0) {
            this.velocity.setMag(0.0001);
        } else {
            this.velocity.setMag(this.velocity.mag() - this.thrust); 
        }
    }

    this.left = function() {
        this.velocity.rotate(-this.turnSpeed);
        this.a -= this.turnSpeed;
    }

    this.right = function() {
        this.velocity.rotate(this.turnSpeed);
        this.a += this.turnSpeed;
    }

    this.bomb = function() {
        if (this.bombCD <= 0) {
            bombs[bombs.length] = new Bomb(this.position, 2);
            this.bombCD = 3;
        }
    }

    this.missile = function() {
        if (this.missileCD <= 0) {
            missiles[missiles.length] = new Missile(this.position, 20, this.target);
            missiles[missiles.length] = new Missile(this.position, -20, this.target);
            this.missileCD = 1;
        }
    }

    this.update = function() {
        this.velocity.limit(6);

        if (keyIsDown(87)) {
            this.forward();
        }
        if (keyIsDown(83)) {
            this.backward();
        }
        if (keyIsDown(65)) {
            this.left();
        }
        if (keyIsDown(68)) {
            this.right();
        }
        if (keyIsDown(32)) {
            this.bomb();
        }
        if (keyIsDown(69)) {
            this.missile();
        }

        this.bombCD -= 1 / 60;
        this.missileCD -= 1 / 60;

        this.position.add(this.velocity);
    }
}