let Game = function() {
	this.history = [];
	this.log = "";
	this.Run = function(mode) {
		let player = new Player(this);

		let inputGravity = document.getElementById("input-gravity");
		let minGravity = Number(inputGravity.min);
		let maxGravity = Number(inputGravity.max);

		player.sv_gravity = Number(inputGravity.value);

		if(player.sv_gravity > maxGravity) {
			player.sv_gravity = maxGravity;
		}

		if(player.sv_gravity < minGravity) {
			player.sv_gravity = minGravity;
		}

		this.log = `<span>sv_gravity: ${player.sv_gravity}</span>`;

		switch(mode) {
			case 1:
				player.position = 0.03125;
				player.stamina = 0.0;
				player.Jump();
			break;
			case 2:
				player.position = 0.03125;
				player.velocity = 0.0;
				player.CheckVelocity();
			break;
			case 3:
				player.position = 0.03125;
				player.DuckJump();
			break;
			case 4:
				player.position = 0.03125;

				let inputHeight = document.getElementById("input-height");
				let minHeight = Number(inputHeight.min);
				let maxHeight = Number(inputHeight.max);
				let neededHeight = Number(inputHeight.value);
		
				if(neededHeight > maxHeight) {
					neededHeight = maxHeight;
				}
		
				if(neededHeight < minHeight) {
					neededHeight = minHeight;
				}

				this.log += "<table><tr><th>Stamina @ Jump</th><th>Frames after last jump</th></tr>";
	
				let endWhileLoop = false;
	
				for(let stamina = 1295.789429; stamina > 0.0; stamina -= 10.0) {
					if(stamina <= 10.0) {
						stamina = 0.0;
					}
					
					player.position = 0.03125;
					player.stamina = stamina;
					player.Jump();
	
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
			break;
		}
		
		if(mode < 4) {
			let framecount = 0;
			while(player.position > -8192.0) {
				player.AirMove();

				if(player.position > -8192.0 && player.velocity < 0.0 && Fract(player.position) <= 0.03125) {
					this.history.push({frame: framecount, origin: player.position.toFixed(0), velocity: Math.fround(player.velocity).toFixed(6)});
				}
				framecount++;
			}
	
			this.log += "<table><tr><th>Frame</th><th>Height</th><th>Velocity</th></tr>";
			for(let i = 0; i < this.history.length; i++) {
				this.log += `<tr><td>${this.history[i].frame}</td><td>${this.history[i].origin}</td><td>${this.history[i].velocity}</td></td>`;
			}
			this.log += "</table>";
		}
	}
}