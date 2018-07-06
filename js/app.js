/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
const cardsContainer=document.querySelector(".deck");

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
init();