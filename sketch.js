class Tilemap{
	constructor(){
		this.data = ["wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
					 "w                  w                   w",
					 "w                  w                   w",
					 "w       www  wwww  w  wwww  www        w",
					 "w                                      w",
					 "w                                      w",
					 "w       www  w  wwwwwwww  w  www       w",
					 "w            w     w      w            w",
					 "wwwww        w     w      w        wwwww",
					 "    w                              w    ",
					 "    w                              w    ",
					 "wwwww          www  www            wwwww",
					 "               w      w                 ",
					 "               w      w                 ",
					 "wwwww          wwwwwwww            wwwww",
					 "    w                              w    ",
					 "    w                              w    ",
					 "wwwww        w     w      w        wwwww",
					 "w            w     w      w            w",
					 "w       www  w  wwwwwwww  w  www       w",
					 "w            w            w            w",
					 "w            w            w            w",
					 "w       www  wwww  w  wwwww  www       w",
					 "w                  w                   w",
					 "w                  w                   w",
					 "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];
	}

	draw(){
		for (let i = 0; i < this.data.length; i++){
			pacman.canMoveLeft = true;
			pacman.canMoveRight = true;
			pacman.canMoveUp = true;
			pacman.canMoveDown = true;

			for (let j = 0; j < this.data[i].length; j++){
				if (this.data[i][j] == "w"){
					this.drawWall(j * 20, i * 20);
					
					if (pacman.x + 2 - 10 >= j * 20){
						pacman.canMoveRight = false;
					}

					if (pacman.x - 2 * + 10 <= j * 20 + 20){
						pacman.canMoveLeft = false;
					}

					if (pacman.y + 2 - 10 >= i * 20){
						pacman.canMoveDown = false;
					}

					if (pacman.y - 2 * + 10 <= i * 20 + 20){
						pacman.canMoveUp = false;
					}

				}
			}
		}
	}

	drawWall(x, y){
		push();
		translate(x, y);
		noStroke();
		fill(52,45,206);
		rect(0, 0, 20, 20, 1);
		pop();
	}
}

class Pacman{
	constructor(){
		this.x = 20;
		this.y = 20;
		this.dirX = 0;
		this.dirY = 0;

		this.canMoveLeft = 0;
		this.canMoveRight = 0;
		this.canMoveUp = 0;
		this.canMoveDown = 0;
		
		this.isMoving = false;
	}

	draw(){
		push();
		translate(this.x + 10, this.y + 10);
		fill(234,232,0);
		stroke(0);
		strokeWeight(1);
		rotate(0.5);
		//circle(0, 0, 20, 20);
		//fill(0);
		arc(0, 0, 20, 20, 0, PI * 5/3);
		pop();
	}

	move(){
		if (this.dirX == 1 && )
	}
		
}

var tilemap;
var pacman;

function keyPressed(){
	
}

function setup(){
	createCanvas(800, 520);
	angleMode(RADIANS);
	tilemap = new Tilemap();
	pacman = new Pacman();
}

function draw(){
	background(0, 0, 0);

	tilemap.draw();
	print(tilemap.wallsByPacman);
	pacman.draw();
	pacman.move();
	//print(pacman.dirX, pacman.dirY);

	tilemap.wallsByPacman = [];
}