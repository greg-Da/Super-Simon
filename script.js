//get the 4 colors
const red = document.getElementsByClassName("red")[0];
const blue = document.getElementsByClassName("blue")[0];
const green = document.getElementsByClassName("green")[0];
const yellow = document.getElementsByClassName("yellow")[0];
//get the btn start & reset
const start = document.getElementById("start");
const reset = document.getElementById("reset");
//get  <h1> which will display the current turn
const turn = document.getElementById("turn");
//get the note displayer
const note = document.getElementById("note");
// get <p> to display the score during the game and at the game over
const idRound = document.getElementById("round");
const idScore = document.getElementById("score");
const modalScore = document.getElementById("modalScore");
const modalRound = document.getElementById("modalRound");

//get the info modal component
const modal = document.getElementById("modalInfo");
const info = document.getElementById("info");
const span = document.getElementsByClassName("close")[0];

//get the game over modal component
const gameOver = document.getElementById("modalGameOver");
const modalReset = document.getElementById("modalReset");

//Number of colors in a sequence
let nmbColor = 4;

//Number of round
let round = 1;

//The level of speed of the game
let speed = 0;

//The sequence made by the computer
let simon = [];

//The sequence made by the player
let listPlayer = [];

//If the Btn reset is pressed, the game will stop
let stop = false;

//The total number of the player's moves which are validated
let goodMoves = 0;

//The nimber of moves the player did during the round
let playerMove = 0;

//Check if that's the player's turn it is
let pTurn = false;

//The information displayed at the begining of the game
turn.innerHTML = "Press Start";
idScore.innerHTML ="Score : " + goodMoves;
idRound.innerHTML ="Round : " + round;

//Start this function by default but users can use it only when it is their turn
playerTurn();

async function IATurn() {
	//Stop the player turn
	pTurn = false;

	//Display IA turn
	turn.innerHTML = "IA Turn";

	//Create a loop until the sequence is long enough
	for (let i = 0; i != nmbColor; i++) {

		//Stop the function if reset is pressed
		if (stop) {return}

			//Choose a random number and insert is value in simon[]
			simon[i] = Math.floor(Math.random() * 4);

		//Call the animation of the random value
		switch (simon[i]) {
			case 0:
			redLight();
			break;

			case 1:
			blueLight();
			break;

			case 2:
			greenLight();
			break;

			case 3:
			yellowLight();
			break;
		};
		//Wait 1 sec between hightlighting colors for the first turn and increase the speed for each new round
		await Wait(1000 - (round * 50));
	}
	//Check wich turn it is & display it
	pTurn = true;
	turn.innerHTML = "Your Turn";
}



function playerTurn() {
	//Stop the function if reset is pressed
	if (stop) {return}

	//If red is pressed
	red.addEventListener("click", () => {
		
		//Check is this is the player's turn
		if (pTurn) {

			//Enter the value in listPlayer
			listPlayer[playerMove] = 0;

			//Check if the color picked is correct and increase the score and display it
			if (listPlayer[playerMove] === simon[playerMove]) {
				playerMove++;
				goodMoves++;
				idScore.innerHTML ="Score : " + goodMoves;
			}

			//If not call the function hasLost
			else {
				hasLost();
			}

			//Call the animation
			redLight();

			//When the length of playerList[] is the same size as the sequence we will compare them 
			if(listPlayer.length === nmbColor){
				Compare();
			}
		}
	})
	//If blue is pressed
	blue.addEventListener("click", () => {
		
		//Check is this is the player's turn
		if (pTurn) {

			//Enter the value in listPlayer
			listPlayer[playerMove] = 1;

			//Check if the color picked is correct and increase the score and display it
			if (listPlayer[playerMove] === simon[playerMove]) {
				playerMove++;
				goodMoves++;
				idScore.innerHTML ="Score : " + goodMoves;
			}
			//If not call the function hasLost
			else {
				hasLost();
			}

			//Call the animation
			blueLight();

			//When the length of playerList[] is the same size as the sequence we will compare them 
			if(listPlayer.length === nmbColor){
				Compare();
			}
		}
	})
	//If green is pressed
	green.addEventListener("click", () => {
		
		//Check is this is the player's turn
		if (pTurn) {

			//Enter the value in listPlayer
			listPlayer[playerMove] = 2;

			//Check if the color picked is correct and increase the score and display it
			if (listPlayer[playerMove] === simon[playerMove]) {
				playerMove++;
				goodMoves++;
				idScore.innerHTML ="Score : " + goodMoves;
			}
			//If not call the function hasLost
			else {
				hasLost();
			}

			//Call the animation
			greenLight();

			//When the length of playerList[] is the same size as the sequence we will compare them 
			if(listPlayer.length === nmbColor){
				Compare();
			}
		}

	})
	//If yellow is pressed
	yellow.addEventListener("click", () => {
		
		//Check is this is the player's turn
		if (pTurn) {

			//Enter the value in listPlayer
			listPlayer[playerMove] = 3;

			//Check if the color picked is correct and increase the score and display it
			if (listPlayer[playerMove] === simon[playerMove]) {
				playerMove++;
				goodMoves++;
				idScore.innerHTML ="Score : " + goodMoves;

			}
			//If not call the function hasLost
			else {
				hasLost();
			}

			//Call the animation
			yellowLight();

			//When the length of playerList[] is the same size as the sequence we will compare them 
			if(listPlayer.length === nmbColor){
				Compare();
			}
		}

	})
}


//Turn both sequence into string and compare them if their the same call the function hasWin else hasLost
function Compare() {
	simonArray = simon.join();
	playerArray = listPlayer.join();
	if (simonArray === playerArray) {
		hasWon();
	}
	else{
		hasLost();
	}
}

//The player won the count of rounds, the speed & the size of the sequence increases
async function hasWon() {
	round++;
	speed++;
	//The speed can't go faster than level 8
	if (speed > 8) {
		speed = 8;
	}
	nmbColor++;
	//Both arrays and playerMoves are set zero/empty
	playerMove = 0;
	listPlayer = [];
	//Display the new round
	idRound.innerHTML ="Round : " + round;
	//Wait 1 sec and launch a new IATurn
	await Wait(1000);
	await IATurn();
}

//The player lost so the game over modal show up with the score and a button reset
function hasLost() {
	if (modalGameOver.style.display === "none") {
		modalGameOver.style.display = "block";
		modalRound.innerHTML = "Round : " + round;
		modalScore.innerHTML = "Score : " + goodMoves;
	}

	//Click on reset btn to hide the modal and reset the game
	modalReset.addEventListener("click", () => {
		modalGameOver.style.display = "none";
		Reset();
	});
}



//Create the animation and sound of the color
function redLight() {
	note.innerHTML = "DO";
	note.style.visibility = "visible";
	let DO = new Audio('sound/do.wav');
	DO.play();
	red.classList.add("red--Active");
	setTimeout(function(){
		red.classList.remove("red--Active");
	},500);
	setTimeout(function(){
		note.style.visibility = "hidden"
	},500);
}

//Create the animation and sound of the color
function blueLight() {
	note.innerHTML = "RE";
	note.style.visibility = "visible";
	let RE = new Audio('sound/re.wav');
	RE.play();
	blue.classList.add("blue--Active");
	setTimeout(function(){
		blue.classList.remove("blue--Active");
	},500);
	setTimeout(function(){
		note.style.visibility = "hidden"
	},500);
}

//Create the animation and sound of the color
function greenLight() {
	note.innerHTML = "MI";
	note.style.visibility = "visible";
	let MI = new Audio('sound/mi.wav');
	MI.play();
	green.classList.add("green--Active");
	setTimeout(function(){
		green.classList.remove("green--Active");
	},500);
	setTimeout(function(){
		note.style.visibility = "hidden"
	},500);
}

//Create the animation and sound of the color
function yellowLight() {
	note.innerHTML = "FA";
	note.style.visibility = "visible";
	let FA = new Audio('sound/fa.wav');
	FA.play();
	yellow.classList.add("yellow--Active");
	setTimeout(function(){
		yellow.classList.remove("yellow--Active");
	},500);
	setTimeout(function(){
		note.style.visibility = "hidden"
	},500);
}

//Function to create an async setTimeout
async function Wait(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

//When the game start it destroys the start bouton, and launch the IA Turn
async function Start() {
	start.style.display = 'none';
	await IATurn();
}


//Stop the current game and totaly reset the game
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
	start.style.display = 'inline';
	idScore.innerHTML = "Score : " + goodMoves;
	idRound.innerHTML ="Round : " + round;
}

//When clicked pass the stop varaible to false & call a function to start the game
start.onclick = function() {

	stop = false;
	Start();
	
};

//When clicked call the Reset function
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