//const numberOfCards = 5;
let playerScore = 0;


function CreateDeck() {
    let setOfCards = [];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
    const suites = ["S", "D", "C", "H"];
    values.forEach(function (value) {
        suites.forEach(function (suit) {
            setOfCards.push(value + suit);
        });
    });
    return setOfCards;
}
let setOfCards = CreateDeck();

//for (var i = 0; i < numberOfCards; i++) {
//    setOfCards.push([values[
//        Math.floor(Math.random() * values.length)]]
//        + suites[
//        Math.floor(Math.random() * suites.length)]);
//};

function DealCards(cards) {
    let computerDeck = [];
    let playerDeck = [];
    for (var i = 0; i < cards.length; i++) {
        if (i % 2 == 0) {
            playerDeck.push(cards[i]);
        }
        else {
            computerDeck.push(cards[i]);
        };
    };
    return { playerDeck, computerDeck };
};

let decks = DealCards(setOfCards);

function ComputerDrawCard() {
    return decks.computerDeck.pop();
};

function PlayerPlayCard() {

};

function ScorePoint(card1, card2) {
    console.log(card1);
    console.log(card2);
    if (card1[0] === card2[0] || card1[1] === card2[1]) {
        return 1;
    }
    else {
        return -1;
    };
};

playerScore += ScorePoint(ComputerDrawCard(), decks.playerDeck[0]);

console.log(playerScore);