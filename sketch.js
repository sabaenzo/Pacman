class objectObj {
  constructor(x, y, o){
    this.x = x;
    this.y = y;
    this.o = o;
  }
}

class Tilemap{
	constructor(){
		this.data = ["wwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
					 "w     w                w     w",
					 "w     w                w     w",
					 "w     w                w     w",
					 "w ww  w  wwwwwwwwwwww  w  ww w",
					 "w w                        w w",
					 "w w                        w w",
					 "w w  ww                ww  w w",
					 "w       wwwww    wwwww       w",
					 "w       w            w       w",
					 "        w            w        ",
					 "w       wwwwwwwwwwwwww       w",
					 "w w  ww                ww  w w",
					 "w w                        w w",
					 "w w                        w w",
					 "w ww  w  wwwwwwwwwwww  w  ww w",
					 "w     w                w     w",
					 "w     w                w     w",
					 "w     w                w     w",
					 "wwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];
		this.objects = [];
	}

	initialize(){
		for (let i = 0; i < this.data.length; i++){
			for (let j = 0; j < this.data[i].length; j++){
				switch(this.data[i][j]){
					case "w": 
						this.objects.push(new objectObj(j * 20, i * 20, 1));
						break;
					case " ":
						this.objects.push(new objectObj(j * 20, i * 20, 2));
				}
			}
		}
	}
	draw(){
		for (let i = 0; i < this.objects.length; i++){
			if (this.objects[i].o == 1){
				this.drawWall(this.objects[i].x, this.objects[i].y);
			} else if (this.objects[i].o == 2){
				this.drawPellet(this.objects[i].x, this.objects[i].y);

				if (dist(pacman.x + 10, pacman.y + 10, this.objects[i].x + 10, this.objects[i].y + 10) < 10){
					this.objects[i].o = 3;
					score += 1;
				}
			}
		}
	}

	drawWall(x, y){
		push();
		translate(x, y);
		noStroke();
		fill(52,45,206);
		rect(0, 0, 20, 20);

		if (x == 0 && y == 0){
			fill(0);
			rect(7, 7, 6, 20);
			rect(13, 7, 7, 6);
		} else if (x == 0 && y == 380){
			fill(0);
			rect(7, 0, 6, 13);
			rect(13, 7, 7, 6);
		} else if (x == 580 && y == 0){
			fill(0);
			rect(0, 7, 13, 6);
			rect(7, 7 , 6, 13);
		} else if (x == 580 && y == 380){
			fill(0);
			rect(0, 7, 13, 6);
			rect(7, 0 , 6, 13);
		}
		else if ((y == 0 || y == 380)){
			fill(0);
			rect(0, 7, 20, 6);
		} else if (x == 0 || x == 580){
			fill(0);
			rect(7, 0, 6, 20);
		}

		pop();
	}

	drawPellet(x, y){
		push();
		translate(x + 10, y + 10);
		fill(255);
		stroke(0);
		strokeWeight(1);
		circle(0, 0, 6);
		pop();

	}

	displayScore(){
		fill(234,232,0);
		stroke(234,232,0);
		strokeWeight(2);
		textSize(15);
		text("SCORE: ", 10, 430);
		text(score, 75, 430);
	}
}

class Pacman{
	constructor(){
		this.x = 20;
		this.y = 20;
		this.dir = 0;
		this.nextDir = 0;
		this.canMove = true;
	}

	draw(){
		push();
		translate(this.x + 10, this.y + 10);
		fill(234,232,0);
		stroke(0);
		strokeWeight(2);
		rotate(0.5 + this.dir);
		arc(0, 0, 18, 18, 0, PI * 5/3);
		pop();
	}

	move(){
		if (this.doesHitWall(this.x + 2 * cos(this.dir), this.y + 2 * sin(this.dir))){
			this.canMove = false;
		}

		if (this.canMove){
			this.x += 2 * cos(this.dir);
			this.y += 2 * sin(this.dir);
		} else if (!this.doesHitWall(this.x + 2 * cos(this.dir), this.y + 2 * sin(this.dir))){
			this.canMove = true;
		}
	}

	doesHitWall(x, y){
		for (let i = 0; i < tilemap.objects.length; i++){	
			if (tilemap.objects[i].o == 1 && x < tilemap.objects[i].x + 20 && x + 20 > tilemap.objects[i].x && y < tilemap.objects[i].y + 20 && y + 20 > tilemap.objects[i].y) {
				return true;
			}
			
		}
		
		return false;
	}
		
}

var tilemap;
var pacman;
var score = 0;

function keyPressed(){
	if (keyCode == LEFT_ARROW || keyCode == 65){
		pacman.dir = PI;
	} else if (keyCode == RIGHT_ARROW || keyCode == 68){
		pacman.dir = 0;
	} else if (keyCode == DOWN_ARROW || keyCode == 83){
		pacman.dir = PI/2
	} else if (keyCode == UP_ARROW || keyCode == 87){
		pacman.dir = 3/2 * PI;
	} else if (keyCode == 32){
		pacman.canMove != pacman.canMove;
	}
}

function setup(){
	createCanvas(600, 440);
	angleMode(RADIANS);
	tilemap = new Tilemap();
	tilemap.initialize();
	pacman = new Pacman();
}

function draw(){
	background(0, 0, 0);

	tilemap.draw();
	pacman.draw();
	pacman.move();
	tilemap.displayScore();

	tilemap.wallsByPacman = [];
}