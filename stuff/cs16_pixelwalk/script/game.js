function Fract(val) {
	return val - Math.floor(val);
}

var Player = function() {
	this.velocity = 0.0;
	this.stamina = 0.0;
	this.position = 0.03125;
	this.frametime = 0.01;
	this.ducking = false;
	this.maxvelocity = 2000.0;

	this.Jump = function(incomingStamina) {
		this.position = 0.03125;
		this.velocity = Math.fround(Math.sqrt(800*45*2));

		if(incomingStamina > 0.0) {
			this.velocity *= (100.0 - incomingStamina * 0.001 * 19.0) * 0.01;
		}

		this.velocity -= 4.0;
		this.stamina = 1315.789429;
	}

	this.AirMove = function() {
		this.position = this.position + this.velocity * this.frametime;
		this.velocity -= 8.0;
		this.CheckVelocity();
	}

	this.StartFalling = function(doubleduck) {
		if(doubleduck) {
			this.position = 18.03125;
			this.velocity = -4.0;
			this.CheckVelocity();
		}
		else {
			this.position = 0.03125;
			this.velocity = 0.0;
			this.CheckVelocity();
		}
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

var GameHistory = function() {
	this.frames = [];
}

var Game = function() {
	this.log = "";
	this.Run = function(mode) {
		this.log = "";

		if(mode == 4) {
			var player = new Player();
			var neededHeight = Number(document.getElementById("input-height").value);
			var endWhileLoop = false;

			this.log = "<table><tr><th>Stamina @ Jump</th><th>Frames after last jump</th></tr>";
			for(let stamina = 1305.789429; stamina > 0.0; stamina -= 10.0) {
				if(stamina <= 10.0) {
					stamina = 0.0;
				}

				player.Jump(stamina);

				endWhileLoop = false;
				
				while(player.position > -8192.0 && !endWhileLoop) {
					player.AirMove();

					if(player.position > -8192.0 && player.velocity < 0.0 && Fract(player.position) <= 0.03125) {
						if(player.position.toFixed(0) == neededHeight) {
							if(stamina > 0.0) {
								this.log += `<tr><td>${(stamina + 10).toFixed(6)}</td><td>${(1315.789429 - (stamina + 10)) / 10}</td></tr>`;
							}
							else {
								this.log += `<tr><td>${stamina.toFixed(6)}</td><td>0</td></tr>`;
							}
							endWhileLoop = true;
						}
					}
				}
			}
			this.log += "</table>";
		}
		else {
			var history = new GameHistory();
			var player = new Player();

			switch(mode) {
				case 1:
					player.Jump(0.0);
				break;
				case 2:
					player.StartFalling(false);
				break;
				case 3:
					player.StartFalling(true);
				break;
			}
			
			var framecount = 0;
			while(player.position > -8192.0) {
				player.AirMove();
				if(player.position > -8192.0 && player.velocity < 0.0 && Fract(player.position) <= 0.03125) {
					history.frames.push({frame: framecount, origin: player.position.toFixed(0), velocity: Math.fround(player.velocity).toFixed(6)});
				}
				framecount++;
			}

			this.log = "<table><tr><th>Frame</th><th>Position</th><th>Velocity</th></tr>";
			for(let i = 0; i < history.frames.length; i++) {
				this.log += `<tr><td>${history.frames[i].frame}</td><td>${history.frames[i].origin}</td><td>${history.frames[i].velocity}</td></td>`;
			}
			this.log += "</table>";
		}
	}
}