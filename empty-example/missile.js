function Missile(position, a, target) {
    this.position = position.copy();
    this.velocity = ship.velocity.copy();

    this.velocity.rotate(a);
    this.velocity.setMag(ship.velocity.mag() + 3);

    this.acceleration = createVector(0, -0.5);
    this.acceleration.rotate(ship.a);
    this.initPos = position.copy();

    this.targetPos = target.copy();
    this.initTargetPos = this.targetPos.copy();
    this.targetVector = this.targetPos.copy().sub(this.position.copy());
    this.a = 0;
    this.aBetween;
    this.lifeTime = 0;
    this.dist = this.position.dist(this.targetPos.copy());
    this.lock = 20;

    this.update = function() {
        this.position = this.initPos.copy().sub(ship.position.copy());
        this.targetPos = this.initTargetPos.copy().sub(ship.position.copy());
        this.targetVector = this.targetPos.copy().sub(this.position.copy());
        this.a = this.acceleration.heading() + 90;
        this.aBetween = this.velocity.copy().angleBetween(this.targetVector.copy());

        this.dist = this.position.dist(this.targetPos.copy());
        if (this.dist > 300) {
            this.lock = 20;
        } else if (this.dist <= 300 && (this.aBetween < 20 && this.aBetween > -20)) {
            this.lock = 2;
        }

        if (this.lifeTime > 0.5) {
            this.velocity.limit(7);
            if (this.aBetween > 5) {
                this.acceleration.rotate(this.aBetween / this.lock);
            } else if (this.aBetween < -5) {
                this.acceleration.rotate(this.aBetween / this.lock);
            }
            this.velocity.add(this.acceleration.copy());
        }
        
        this.initPos.add(this.velocity.copy());
        
        this.lifeTime += 1 / 60;
        particle.addParticle(ship.position.copy().add(this.position), this.a, random(2, 3), 128);
    }

    this.show = function() {
        push();
        fill(255);
        strokeWeight(0);
        translate(this.position.x, this.position.y);
        rotate(this.a);
        rect(0, 0, 2, 9)
        pop();
        ellipse(this.targetPos.x, this.targetPos.y, 16, 16);
    }

    this.delete = function() {
        if (this.dist <= 32) {
            bombs[bombs.length] = new Bomb(ship.position.copy().add(this.targetPos), 1);
            return true;
        } else if (this.lifeTime > 15) {
            bombs[bombs.length] = new Bomb(ship.position.copy().add(this.position), 1);
            return true;
        } else {
            return false;
        }
    }
}