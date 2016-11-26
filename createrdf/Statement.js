function Statement(_prop,_begin,_end) {
	this.prop = _prop;
	this.begin = _begin;
	this.end = _end;
	
	/* this.diameter = random(10, 30);
		this.speed = .1;
		this.selected = false;
		this.colorSelected = color(204, 102, 0);
	*/
	/* this.move = function() {
		this.x += random(-this.speed, this.speed);
		this.y += random(-this.speed, this.speed);
	};*/
	
	this.display = function() {
		
		
		line(this.begin.x,this.begin.y,this.end.x,this.end.y);
		//console.log(this.begin.x,this.begin.y,this.end.x,this.end.y);
		/*push();
		
		translate(this.begin.x, this.begin.y);
		beginShape();
		vertex(this.end.x,this.end.y);
		endShape();
		pop();*/
		
		/* if (this.selected) {
			stroke(this.colorSelected);
			} else {
			stroke(0);
			}
			
			
			push();
			
			translate(this.x, this.y);
			rotate(PI/2);
			beginShape();
			var xoff = 0;
			
			for (var a = 0; a <= TWO_PI+0.2; a += 0.1) {
			var offset = map(noise(xoff + yoff), 0, 1, -this.diameter, this.diameter);
			var r = this.diameter + offset / 4;
			var x = r * cos(a);
			var y = r * sin(a);
			vertex(x, y);
			xoff += 1 * dOff;
			
			}
			
			endShape();
			
			pop();
			textAlign(CENTER);
			text(this.name, this.x, this.y);
			yoff += 0.001 * dOff;
		*/
		// ellipse(this.x, this.y, this.diameter, this.diameter);
	};
}