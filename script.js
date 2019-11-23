const red = document.getElementsByClassName("red")[0];
const blue = document.getElementsByClassName("blue")[0];
const green = document.getElementsByClassName("green")[0];
const yellow = document.getElementsByClassName("yellow")[0];
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const turn = document.getElementById("turn");
const idRound = document.getElementById("round");
const idScore = document.getElementById("score");



let nmbColor = 4;
let round = 1;
let speed = 0;
let simon = [];
let listPlayer = [];
let stop = false;
let goodMoves = 0;
let playerMove = 0;

turn.innerHTML = "Press Start";

idScore.innerHTML = "0";
idRound.innerHTML = round;


async function IATurn() {
		turn.innerHTML = "IA Turn";
	for (let i = 0; i != nmbColor; i++) {
		if (stop) {return}
		simon[i] = Math.floor(Math.random() * 4);;
		switch (simon[i]) {
			case 0:
			redLight();
			console.log(simon);
			break;

			case 1:
			blueLight();
			console.log(simon);
			break;

			case 2:
			greenLight();
			console.log(simon);
			break;

			case 3:
			yellowLight();
			console.log(simon);
			break;
		};
		await Wait(1000 - (round * 50));
	}
}



function playerTurn() {
	if (stop) {return}
		turn.innerHTML = "Your Turn";
	red.addEventListener("click", () => {
		let audio = new Audio('sound/do.wav');
		audio.play();
		listPlayer[playerMove] = 0;
		if (listPlayer[playerMove] != simon[playerMove]) {
			hasLost();
		}
		else {
		playerMove++;
		goodMoves++;
		idScore.innerHTML = goodMoves;
		}
		redLight();
		if(listPlayer.length === nmbColor){
			Compare();
		}
	})

	blue.addEventListener("click", () => {
		let audio = new Audio('sound/re.wav');
		audio.play();
		listPlayer[playerMove] = 1;
		if (listPlayer[playerMove] != simon[playerMove]) {
			hasLost();
		}
		else {
		playerMove++;
		goodMoves++;
		idScore.innerHTML = goodMoves;
		}
		blueLight();
		if(listPlayer.length === nmbColor){
			Compare();
		}
	})

	green.addEventListener("click", () => {
		let audio = new Audio('sound/mi.wav');
		audio.play();
		listPlayer[playerMove] = 2;
		if (listPlayer[playerMove] != simon[playerMove]) {
			hasLost();
		}
		else {
		playerMove++;
		goodMoves++;
		idScore.innerHTML = goodMoves;
		}
		greenLight();
		if(listPlayer.length === nmbColor){
			Compare();
		}

	})

	yellow.addEventListener("click", () => {
		let audio = new Audio('sound/fa.wav');
		audio.play();
		listPlayer[playerMove] = 3;
		if (listPlayer[playerMove] != simon[playerMove]) {
			hasLost();
		}
		else {
		playerMove++;
		goodMoves++;
		idScore.innerHTML = goodMoves;
		}
		yellowLight();
		if(listPlayer.length === nmbColor){
			Compare();
		}

	})
}


function Compare() {
	simonArray = simon.join();
	playerArray = listPlayer.join();
	if (simonArray === playerArray) {
		console.log("WIN")
		console.log(speed)
		hasWon();
	}
}

async function hasWon() {
	round++;
	speed++;
	if (speed > 8) {
		speed = 8;
	}
	nmbColor++;
	playerMove = 0;
	listPlayer = [];
	idRound.innerHTML = round;
	console.log(listPlayer);
	await Wait(1000);
	await IATurn();
}

function hasLost() {
	turn.innerHTML = "Game Over";
}


function redLight() {
	let DO = new Audio('sound/do.wav');
	DO.play();
	red.classList.add("red--Active");
	setTimeout(function(){
		red.classList.remove("red--Active");
	},500);
}

function blueLight() {
	let RE = new Audio('sound/re.wav');
	RE.play();
	blue.classList.add("blue--Active");
	setTimeout(function(){
		blue.classList.remove("blue--Active");
	},500);
}

function greenLight() {
	let MI = new Audio('sound/mi.wav');
	MI.play();
	green.classList.add("green--Active");
	setTimeout(function(){
		green.classList.remove("green--Active");
	},500);
}

function yellowLight() {
	let FA = new Audio('sound/fa.wav');
	FA.play();
	yellow.classList.add("yellow--Active");
	setTimeout(function(){
		yellow.classList.remove("yellow--Active");
	},500);
}

async function Wait(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function Start() {
	start.style.display = 'none';
	await IATurn();
	await playerTurn();
}

function Reset() {
	stop = true;
	turn.innerHTML = "Press Start";
	nmbColor = 4;
	round = 1;
	speed = 0;
	playerMove = 0;
	goodMoves = 0;
	simon = [];
	listPlayer = [];
	start.style.display = 'inline';
}

start.addEventListener("click", () => {

	stop = false;
	Start();
	
});

reset.addEventListener("click", () => {

	Reset();
	
});