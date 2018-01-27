let arr = [];
let circleN = 65;
let lineDist = 150;
let fadeIn = 0;

// window.addEventListener('resize', resizeCanvas, false);

// function resizeCanvas(){
	
// }

function circle(x, y, radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx;
	this.dy;
	this.setDirection = function(){
		
		if(Math.floor(Math.random()*2) === 0){
			this.dx = Math.random() + 1;
		}else{
			this.dx = (Math.random() + 1) * -1;
		}

		if(Math.floor(Math.random()*2) === 0){
			this.dy = Math.random() + 1;
		}else{
			this.dy = -1 * (Math.random() + 1);
		}
	}

	this.move = function(){
		this.x += this.dx;
		this.y += this.dy;
		if(this.x + this.dx > window.innerWidth || this.x + this.dx < 0) {
			let newD = (Math.random()) + 1;
			if(this.dx < 0){
    			this.dx = newD;
    		}else{
    			this.dx = -newD;
    		}
		}

		if(this.y + this.dy > window.innerHeight || this.y + this.dy < 0) {
    		let newD = (Math.random()) + 1;
    		if(this.dy < 0){
    			this.dy = newD;
    		}else{
    			this.dy = -newD;
    		}
		}
	}

}

for(let i = 0; i < circleN; i++){
	arr.push(new circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, (Math.random() * 4) + 1));
	arr[i].setDirection();
}

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
	//let font = loadFont('./Fonts/LeagueGothic-Regular.otf');
	textAlign(CENTER);
	textFont('Lato');
	textSize(64);
}

function draw(){
	background(106, 90, 205);
	for(let i = 0; i < circleN; i++){
		for(let j = 0; j < circleN; j++){
			let distX = Math.pow(arr[i].x - arr[j].x, 2);
			let distY = Math.pow(arr[i].y - arr[j].y, 2);
			let dist = Math.sqrt(distX + distY, 2);
			if(dist < lineDist){
				let alpha = 1 - (dist/lineDist);
				//console.log(alpha);
				if(fadeIn <= alpha){
					stroke('rgba(255, 255, 255,' + fadeIn +')');
				}else{
					stroke('rgba(255, 255, 255,' + alpha +')');
				}
				//fill(0,0, 0,alpha);
				line(arr[i].x, arr[i].y, arr[j].x, arr[j].y);
			}
		}
	}
	
	if(fadeIn <= 0.75){
		stroke('rgba(255, 255, 255,' + fadeIn +')');
		fill('rgba(255,255,255, ' + fadeIn + ')');
	}else{
		stroke('rgba(255,255,255,0.75)');
		fill('rgba(255,255,255,0.75)');
	}

	for(let i = 0; i < circleN; i++){
		ellipse(arr[i].x, arr[i].y, arr[i].radius, arr[i].radius);
		arr[i].move();
	}
	noStroke();
	if(fadeIn <= 1){
		fadeIn += 0.01;
		fill('rgba(255, 255, 255,'+ fadeIn+')');
		//stroke('rgba(255, 255, 255,'+ textFadeIn+')');
		//console.log(textFadeIn);
	}else{
		fill(255);
		//stroke(255);
	}
	//fill('rgba(255, 255, 255)');
	text('Welcome User', window.innerWidth/2, window.innerHeight/2);
}