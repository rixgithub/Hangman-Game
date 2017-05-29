// on start up computer takes random word and displays it with blanks
// user guesses letter and either goes into random word or goes into letters already guessed
// if user guesses too many times its end of game and start over.
// if user keeps guessing and guesses all letters in word user wins and song plays.
// start game over again.

// ******************* GLOBAL VARIABLES **************
// arrays
var words = ["rug", "bowling", "dude", "ransom"];
var answer = "";
var lettersInAnswer = [];
var lettersAndBlanks = [];
var answerCount = 0;
var wrongGuesses = [];

// game counters
var wins = 0;
var losses = 0;
var guessRemain = answer.length + 10;

// ************************** FUNCTIONS ***************

function startGame() {
	answer = words[Math.floor(Math.random() * words.length)];
	lettersInAnswer = answer.split("");
	answerCount = lettersInAnswer.length;

	// reset
	guessRemain = answer.length + 10;
	wrongGuesses = [];
	lettersAndBlanks = [];

	// correct amount of blank lines going into lettersAndBlanks array
	for (var i = 0; i < lettersInAnswer.length; i++) {
		lettersAndBlanks.push("_");
	}

	// update HTML with the game data
	document.getElementById("currentWord").innerHTML = lettersAndBlanks.join(" ");
	document.getElementById("guessRemain").innerHTML = guessRemain;
	document.getElementById("alreadyGuessed").innerHTML = wrongGuesses;
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("losses").innerHTML = losses;


	console.log(answer);
	console.log(lettersInAnswer);
	console.log(answerCount);
	console.log(lettersAndBlanks);
	
}

function checkLetters(letter) {
	// check if letter exists in answer
	var isLetterInAnswer = false;

	for (var i=0; i < answerCount; i++) {
		if (answer[i] === letter) {
			isLetterInAnswer = true;
		}
	}

	// check where in word where letter exits and replace "_" with letter
	if (isLetterInAnswer) {
		for (var i = 0; i < answerCount; i++) {
			if (answer[i] === letter) {
				lettersAndBlanks[i] = letter;
			}
		}
	}
	 // letter was not found in answer
	else {
		wrongGuesses.push(letter);
		guessRemain--;
	}

	console.log(lettersAndBlanks);
}

function completeRound() {
	// update HTML
	document.getElementById("guessRemain").innerHTML = guessRemain;
	document.getElementById("currentWord").innerHTML = lettersAndBlanks.join(" ");
	document.getElementById("alreadyGuessed").innerHTML = wrongGuesses.join(" ");

	// check if user won
	if (lettersInAnswer.toString() === lettersAndBlanks.toString()) {
		wins++;
		alert("You Won!");
		// update HTML
		document.getElementById("wins").innerHTML = wins;

		startGame();
	}

	// check if user lost
	else if (guessRemain === 0) {
		losses++;
		alert("You Lost");

		// update HTML
		document.getElementById("losses").innerHTML = losses;
		startGame();
	}


}

 
// ***************** MAIN GAME PROCESS ******************

// gets the game started
startGame();

// get the user key click
document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(userInput);
	completeRound();

	console.log(userInput);
}











