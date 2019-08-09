function Fract(val) {
	return val - Math.floor(val);
}

let Player = function() {
	this.velocity = 0.0;
	this.stamina = 0.0;
	this.position = 0.0;
	this.frametime = 0.01;
	this.ducking = false;
	this.maxvelocity = 2000.0;
	this.sv_gravity = 800.0;

	this.Jump = function() {
		this.velocity = Math.fround(Math.sqrt(800*45*2));

		if(this.stamina > 0.0) {
			this.velocity *= (100.0 - this.stamina * 0.001 * 19.0) * 0.01;
		}

		this.velocity -= this.sv_gravity * this.frametime * 0.5;
		this.stamina = 1315.789429;
	}

	this.DuckJump = function() {
		this.position += 18.0;
		this.velocity = -(this.sv_gravity * this.frametime * 0.5);
		this.CheckVelocity();
	}

	this.AirMove = function() {
		this.position = this.position + this.velocity * this.frametime;
		this.velocity -= this.sv_gravity * this.frametime;
		this.CheckVelocity();
	}

	this.CheckVelocity = function() {
		if(this.velocity > this.maxvelocity) {
			this.velocity = this.maxvelocity;
		}
		if(this.velocity < -this.maxvelocity) {
			this.velocity = -this.maxvelocity;
		}
	}
}