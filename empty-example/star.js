function Star(x, y, r) {
    this.position = createVector(x, y);
    this.initPos = this.position.copy();
    this.history = [];

    if (r == null) {
        this.r = floor(random(0, 2));
    } else {
        this.r = r;
    }

    this.show = function() {
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }

    this.update = function() {
        this.position = this.initPos.copy().sub(ship.position.copy());

        this.history.push(this.position);

        if (this.history.length > 5) {
            this.history.splice(0, 1);
        }
    }

    this.offscreen = function() {
        if (this.position.x < -width/2 - this.r * 2) {
            return [true, 1];
        } else if (this.position.x > width/2 + this.r * 2) {
            return [true, 2];
        } else if (this.position.y < -height/2 - this.r * 2) {
            return [true, 3];
        } else if (this.position.y > height/2 + this.r * 2) {
            return [true, 4];
        } else {
            return [false, 0];
        }
    }
}