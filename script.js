const red = document.getElementsByClassName("red")[0];
const blue = document.getElementsByClassName("blue")[0];
const green = document.getElementsByClassName("green")[0];
const yellow = document.getElementsByClassName("yellow")[0];
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const reset = document.getElementById("reset");
const turn = document.getElementById("turn");
const idRound = document.getElementById("round");
const idScore = document.getElementById("score");

const modal = document.getElementById("modalInfo");

const info = document.getElementById("info");


const span = document.getElementsByClassName("close")[0];

const gameOver = document.getElementById("modalGameOver");
const modalReset = document.getElementById("modalReset");
const modalScore = document.getElementById("modalScore");
const modalRound = document.getElementById("modalRound");

let nmbColor = 4;
let round = 1;
let speed = 0;
let simon = [];
let listPlayer = [];
let stop = false;
let goodMoves = 0;
let playerMove = 0;
let pTurn = false;

turn.innerHTML = "Press Start";

idScore.innerHTML = "0";
idRound.innerHTML = round;


async function IATurn() {
	pTurn = false;
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
	pTurn = true;
	turn.innerHTML = "Your Turn";
}



function playerTurn() {
	if (stop) {return}
	red.addEventListener("click", () => {
		if (pTurn) {
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
	}
	})

	blue.addEventListener("click", () => {
		if (pTurn) {
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
	}
	})

	green.addEventListener("click", () => {
		if (pTurn) {
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
	}

	})

	yellow.addEventListener("click", () => {
		if (pTurn) {
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
	}

	})
}


function Compare() {
	simonArray = simon.join();
	playerArray = listPlayer.join();
	if (simonArray === playerArray) {
		console.log("WIN")
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
	await Wait(1000);
	await IATurn();
}

function hasLost() {
	if (modalGameOver.style.display === "none") {
		modalGameOver.style.display = "block";
		modalRound.innerHTML = "Round : " + round;
		modalScore.innerHTML = "Score : " + goodMoves;
	}

	modalReset.addEventListener("click", () => {
		modalGameOver.style.display = "none";
		Reset();
	});
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

async function Restart() {
	restart.style.display = 'none';
	await IATurn();
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
	pTurn = false;
	restart.style.display = 'inline';
	idScore.innerHTML = "0";
	idRound.innerHTML = round;
}

start.onclick = function() {

	stop = false;
	Start();
	
};

restart.onclick = function() {

	stop = false;
	Restart();
	
};

reset.onclick = function() {

	Reset();
	
};

// When the user clicks the button, open the modal 
info.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}