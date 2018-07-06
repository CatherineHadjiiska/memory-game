/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
const movesContainer = document.querySelector(".moves");
movesContainer.innerHTML = 0;
const cardsContainer=document.querySelector(".deck");
const modal=document.querySelector(".modal");
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'


let openedCards = [];
let matchedCards = [];
let firstClick = true;
let minute = 0;
let second = 0;
let timer = document.querySelector(".timer");
let moves = 0;


// initiate the game

function init() {
shuffle(icons);// shuffles before initialization
for (let i = 0; i < icons.length; i++){
	const card = document.createElement("li");
	card.classList.add("card");
	card.innerHTML = "<i class= '" + icons[i] + "'</i>";
	cardsContainer.appendChild(card);

	click(card);
}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let counter = array.length; //typo
    while(counter > 0) {
    	let index = Math.floor(Math.random() * counter);
    	counter--;

    	let temp = array[counter];
    	array[counter] = array [index];
    	array[index] = temp;

    }
    return array;
     
}

// Click cards function

function click(card){

	//Click event
	card.addEventListener("click", function() {

		const currentCard = this;
		const previousCard = openedCards[0];

		if (firstClick) {

			startTimer();

			firstClick = false;
		}

		//opened card
		if(openedCards.length === 1) {

			card.classList.add("open", "show", "disable");
			openedCards.push(this);

			//compare opened cards 
			compare(currentCard, previousCard);		

		} else {
			currentCard.classList.add("open", "show", "disable");
			openedCards.push(this);
		}
	});
}

// compare cards

function compare(currentCard, previousCard) {
	if(currentCard.innerHTML === previousCard.innerHTML) {

				currentCard.classList.add("match");
				previousCard.classList.add("match");

				matchedCards.push(currentCard, previousCard); 

				openedCards = [];

				//check if game is over


				isOver();


				} else {

				setTimeout(function() {
				currentCard.classList.remove("open", "show", "disable");
				previousCard.classList.remove("open", "show", "disable");
				openedCards = [];
			}, 500);
			}

			//add move, update rating

			addMove();
			rating();
		
			}

//game over

function isOver() {
	if(matchedCards.length === icons.length) {
		clearInterval(interval);
		

		gameOverModal();
	}
}

// pop-up modal and display functions

function gameOverModal() {

	modal.style.top = "0";


	document.getElementById("total_rate").innerHTML = starsContainer.innerHTML;


	stopTimer();
	document.getElementById("total_time").innerHTML = endTime;


	const totalMoves = document.querySelector("#total_moves");
	totalMoves.innerHTML = moves + 1;

	
}

// Add moves 

function addMove() {
	moves++;
	movesContainer.innerHTML = moves;

}

// rating

function rating() {
	switch(moves) {
		case 14:
		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
		break; 

		case 20:
		starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>'
		break;
	}

}

// Timer

var interval;
function startTimer() {
	interval = setInterval(function(){
		timer.innerHTML = minute+"min "+second+"sec";
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
	},1000);
}

// Stop timer function

function stopTimer() {
	clearInterval(interval);
	endTime = timer.innerHTML;
}


// Reset game button 
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
	cardsContainer.innerHTML = "";

	//launch new game

	newGame();

	
});

// Play again button from modal

const restartBtnModal = document.querySelector(".play-again");
restartBtnModal.addEventListener("click", function() {
	cardsContainer.innerHTML = "";

	//hide modal
	modal.style.top = "-150%";

	//launch new game

	newGame();

	
});

// reset values function to reset game

function resetValues() {
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = "";
	starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
	timer.innerHTML = "0 min 0sec";
	stopTimer();
	firstClick = true; 
	minute = 0;
	second = 0;

}

function newGame() {
	cardsContainer.innerHTML = "";

	resetValues();

	init();
}

init();