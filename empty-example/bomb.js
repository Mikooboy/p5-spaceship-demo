function Bomb(position, l) {
    this.position = position.copy();
    this.velocity = ship.velocity.copy();
    this.velocity.setMag(ship.velocity.mag() + 5);
    this.initPos = position.copy();
    this.r = 6;
    this.maxR = 64;
    this.lifeTime = l;

    this.update = function() {
        this.velocity.limit(10);
        this.position = this.initPos.copy().sub(ship.position.copy());

        if (this.lifeTime <= 1) {
            if (this.r < this.maxR) {
                this.r *= 1.5;
            } else {
                this.r += 1;
            }
        } else {
            this.initPos.add(this.velocity);
        }
        
        this.lifeTime -= 1 / 60;
    }

    this.show = function() {
        fill('rgba(255,0,0, ' + (this.lifeTime + 0.1) + ')');
        strokeWeight(0);
        ellipse(this.position.x, this.position.y, this.r, this.r)
    }

    this.delete = function() {
        if (this.lifeTime <= 0) {
            return true;
        }
    }
}