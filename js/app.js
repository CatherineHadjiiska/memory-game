/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
const cardsContainer=document.querySelector(".deck");


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
    let counter = array.length; 
    while(counter > 0) {
    	let index = Math.floor(Math.random() * counter);
    	counter--;

    	let temp = array[counter];
    	array[counter] = array [index];
    	array[index] = temp;

    }
    return array;
     
}

function click(card){

	//Click event
	card.addEventListener("click", function() {

		const currentCard = this;
		const previousCard = openedCards[0];

		if (firstClick) {

			

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

function isOver() {
	if(matchedCards.length === icons.length) {
		clearInterval(interval);
		

		gameOverModal();
	}
}

function addMove() {
	moves++;
	movesContainer.innerHTML = moves;

}

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

function stopTimer() {
	clearInterval(interval);
	endTime = timer.innerHTML;
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
	cardsContainer.innerHTML = "";

	newGame();

	
});

const restartBtnModal = document.querySelector(".play-again");
restartBtnModal.addEventListener("click", function() {
	cardsContainer.innerHTML = "";

	//hide modal
	modal.style.top = "-150%";

	newGame();

	
});

init();