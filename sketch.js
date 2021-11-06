class objectObj {
  constructor(x, y, o){
    this.x = x;
    this.y = y;
    this.o = o;
  }
}

var qObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
};

var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
};


qObj.prototype.set = function(a, b) {
    this.x = a;
    this.y = b;
};

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
					 "w       w            w       w",
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
                		walls.push(new wallObj(j*20, i*20));

						graph[i][j] = -1;
						break;
					case " ":
						this.objects.push(new objectObj(j * 20, i * 20, 2));
						graph[i][j] = 0;

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
		text("SCORE: " + score, 10, 420);
	}
}

class Pacman{
	constructor(){
		this.x = 20;
		this.y = 20;
		this.dir = 0;
		this.nextDir = 0;
		this.canMove = true;
		this.lives = 3;
	}

	draw(){
		push();
		translate(this.x + 10, this.y + 10);
		fill(234,232,0);
		stroke(0);
		strokeWeight(2);
		rotate(0.5 + this.dir);
		arc(0, 0, 18, 18, 0, PI * 5/3);
		fill(0);
		if (this.dir == PI){
			circle(3, 4, 2);
		} else {
			circle(0, -5, 2);
		}
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

		if (this.y == 200 && this.x < -15){
			this.x = 620;
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

	showLives(){
		for (let i = 0; i < this.lives; i++){
			push();
			translate(570 - i * 25, 415);
			fill(234,232,0);
			stroke(0);
			strokeWeight(2);
			rotate(0.5 + PI);
			arc(0, 0, 18, 18, 0, PI * 5/3);
			fill(0);
			
			circle(3, 4, 2);
			pop();
		}
	}
		
}

class WanderState{
	constructor(){
		this.wanderDist = random(30, 60);
		this.directions = [0, PI/2, PI, 3/2 * PI];
	}

	execute(me){
		if (this.wanderDist <= 0){
			this.wanderDist = random(30, 60);
			me.dir = random(this.directions);
		}
		this.wanderDist -= 1;

		if (me.dir == PI ){
			if (!pacman.doesHitWall(me.x - 1, me.y)){
				me.move();
			} else {
				this.dir = 3/2 * PI;
			}
		} else if(me.dir == 0){
			if (!pacman.doesHitWall(me.x + 1, me.y)){
				me.move();
			} else {
				this.dir = PI/2;
			}
		} else if(me.dir == 3/2 * PI){
			if (!pacman.doesHitWall(me.x, me.y - 1)){
				me.move();
			} else {
				this.dir = PI;
			}
		} else if(me.dir == PI/2){
			if (!pacman.doesHitWall(me.x, me.y + 1)){
				me.move();
			} else {
				this.dir = 0;
			}
		}
		if (dist(me.x, me.y, pacman.x, pacman.y) < 140){
			me.changeState(1);
		}
	}
}

class ChaseState{
	constructor(){
		this.chasePath = [];
		this.xTravel = 0;
		this.yTravel = 0;
		this.index = 0;
		this.targetCoords;
		this.step = [];
	}

	execute(me){
		if (this.index == 0){
			target.x = pacman.x;
			target.y = pacman.y;
			finalDest.x = target.x;
		    finalDest.y = target.y;
		    targetPos.x = floor(finalDest.y / 20);
		    targetPos.y = floor(finalDest.x / 20);
		    var i = floor(npcs[0].x / 20);
		    var j = floor(npcs[0].y / 20);
		    initGraph(i, j);
		    pathFound = 0;
		    pathLen = 0;
		    findAStarPath(i, j);
		    pathLen--;
		    this.index = pathLen;
		    target.x = path[pathLen].x;
		    target.y = path[pathLen].y;
		    
		    for (let z = 0; z <= pathLen; z++){
		    	this.chasePath.push([Math.floor(path[z].x /20)*20, Math.floor(path[z].y /20)*20]);
		    }
		    this.targetCoords = [this.chasePath[this.index][1], this.chasePath[this.index][0]];
		   	this.index -= 1;

		} else {		
			if (dist(this.targetCoords[0], this.targetCoords[1], me.x, me.y)> 2){
				this.step[0] = this.targetCoords[0] - me.x;
				this.step[1] = this.targetCoords[1] - me.y;

				if (this.step[0] != 0){
					this.step[0] /= Math.abs(this.step[0]);
					this.step[1] = 0;
				} else if(this.step[1] != 0){
					this.step[0] = 0;
					this.step[1] /= Math.abs(this.step[1]);
				}

				me.x += this.step[0];
				me.y += this.step[1];
			} else {
				this.index -= 1;
				if (this.index > 0 && this.chasePath.length){
					this.targetCoords = [this.chasePath[this.index][1], this.chasePath[this.index][0]]; 
				}
			}	
		}
		

	    if (dist(me.x, me.y, pacman.x, pacman.y) >= 140){
			me.changeState(0);
			this.targetCoords = [];
			this.chasePath = [];
		}
	}
}

class NPC{
	constructor(x, y, color, id){
		this.x = x;
		this.y = y;
		this.color = color;
		this.state = [new WanderState(), new ChaseState()];
		this.currState = 0;
		this.dir = 0;
		this.id = id;
	}

	changeState(x){
		this.currState = x;
	}

	draw(){
		push();
		translate(this.x + 10, this.y + 10);
		fill(this.color);
		noStroke();
		ellipse(0, 0, 20, 15);
		triangle(-7, 0, 7, 0, -5, 9);
		triangle(-7, 0, 7, 0, 0, 11);
		triangle(-7, 0, 7, 0, 5, 11);
		fill(255);
		circle(-4, 0, 4);
		circle(4, 0, 4);
		fill(0,51,182);
		circle(-4, 0, 2);
		circle(4, 0, 2);


		pop();

		if (dist(this.x, this.y, pacman.x, pacman.y) < 10){
			pacman.lives -= 1;
			pacman.x = 20;
			pacman.y = 20;
			if (pacman.lives == 0){
				gameover = 1;
			}
		}
	}

	move(dir){
		if (this.dir == 0 && this.x + 2 <= 560){
			this.x += 1;
		} else if (this.dir == PI && this.x - 2 >= 0){
			this.x -= 1;
		} else if (this.dir == 3/2 * PI && this.y - 2 >= 20){
			this.y -= 1;
		} else if (this.dir == PI/2 && this.y + 2 <= 360){
			this.y += 1;
		}
	}
}



var graph = [];
var cost = [];
var inq = [];
var comefrom = [];
var path = [];
var q = [];
var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;


var initGraph = function(x, y) {
    for (var i = 0; i< 20; i++) {
        for (var j = 0; j<30; j++) {
            if (graph[i][j] > 0) {
                graph[i][j] = 0;
            }
            inq[i][j] = 0;
            cost[i][j] = 0;
        }
    }

    graph[x][y] = 1;
};

var findAStarPath = function(x, y){
	var i, j, a, b;
	qLen = 0;
	graph[x][y] = 1;
    inq[x][y] = 1;
    q[qLen].set(x, y);
    q[qLen].fcost = 0;
    qLen++;
    pathLen = 0;
    qStart = 0;

    var findMinInQ = function() {
        var min = q[qStart].fcost;
        var minIndex = qStart;
        for (var i = qStart+1; i<qLen; i++) {
            if (q[i].fcost < min) {
                min = q[i].qStart;
                minIndex = i;
            }
        }
        if (minIndex !== qStart) {
            var t1 = q[minIndex].x;
            var t2 = q[minIndex].y;
            var t3 = q[minIndex].fcost;
            q[minIndex].x = q[qStart].x;
            q[minIndex].y = q[qStart].y;
            q[minIndex].fcost = q[qStart].fcost;
            q[qStart].x = t1;
            q[qStart].y = t2;
            q[qStart].fcost = t3;
        }
    };

    var setComeFrom = function(a, b, i, j) {
        inq[a][b] = 1;
        comefrom[a][b].set(i, j);
        q[qLen].set(a, b);
        cost[a][b] = cost[i][j] + 10;
        q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10, pacman.x, pacman.y);
        qLen++;
    };

    while ((qStart < qLen) && (pathFound === 0)) {
        findMinInQ();
        i = q[qStart].x;
        j = q[qStart].y;
        graph[i][j] = 1;
        qStart++;

        if ((i === targetPos.x) && (j === targetPos.y)) {
            pathFound = 1;
            path[pathLen].set(j*20+10, i*20+10);
            pathLen++;
        }

        a = i+1;
        b = j;
        if ((a < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i-1;
        b = j;
        if ((a >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j+1;
        if ((b < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j-1;
        if ((b >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
    }

    while ((i !== x) || (j !== y)) {
        a = comefrom[i][j].x;
        b = comefrom[i][j].y;
        path[pathLen].set(b*20 + 10, a*20+10);
        pathLen++;
        i = a;
        j = b;
    }
};

var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};


var target, finalDest, targetPos;

var mouseClicked = function(){
	/*
	target.x = mouseX;
	target.y = mouseY;
	finalDest.x = target.x;
    finalDest.y = target.y;
    targetPos.x = floor(finalDest.y / 20);
    targetPos.y = floor(finalDest.x / 20);
    print(targetPos.y * 20, targetPos.x * 20);
    var i = floor(npcs[0].x / 20);
    var j = floor(npcs[0].y / 20);
    initGraph(i, j);
    pathFound = 0;
    pathLen = 0;
    findAStarPath(i, j);
    print(pathLen);
    pathLen--;
    target.x = path[pathLen].x;
    target.y = path[pathLen].y;
    
    for (let z = pathLen; z >= 0; z--){
    	chasePath.push([Math.floor(path[z].x /20)*20, Math.floor(path[z].y /20)*20]);

    }
    print(chasePath);*/
}

var start = 1;
var tilemap;
var pacman;
var npcs = [];
var walls = [];
var score = 0;
var success = 0;
var gameover = 0;

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
	
	pacman = new Pacman();
	npcs.push(new NPC(200, 200, color(0,252,255), 0));
	npcs.push(new NPC(400, 200, color(255,49,0), 1));
	npcs.push(new NPC(260, 180, color(255,161,205), 2));
	npcs.push(new NPC(340, 180, color(255,204,0), 3));


	target = new targetObj(0, 0);
	targetPos = new targetObj(0, 0);
	finalDest = new targetObj(0, 0);

	for (var i = 0; i < 20; i++){
		graph[i] = new Array(30);
		cost[i] = new Array(30);
	    inq[i] = new Array(30);
	    comefrom[i] = new Array(30);
	}
	for (i=0; i<600; i++) {
		path.push(new p5.Vector(0, 0));
		q.push(new qObj(0, 0));
	}
	for (i=0; i<20; i++) {
		for(var j=0; j<30; j++) {
		    comefrom[i][j] = new p5.Vector(0, 0);
		}
	}

	tilemap = new Tilemap();
	tilemap.initialize();
}

function draw(){
	background(0, 0, 0);

	if (start && !gameover && !success){
		tilemap.draw();
		tilemap.displayScore();

		pacman.draw();
		pacman.move();
		pacman.showLives();

		for (let i = 0; i < npcs.length; i++){
			npcs[i].draw();
			npcs[i].state[npcs[i].currState].execute(npcs[i]);
		}

		if (score == 408){
			success = 1;
		}

	} else if (gameover){
		fill(255, 0, 0);
		textSize(30);
		text("GAME OVER", 200, 150);
	} else if (success){
		fill(0, 255, 0);
		textSize(30);
		text("SUCCESS!!", 200, 150);
	}
}