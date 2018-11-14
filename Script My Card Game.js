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

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function DealCards(cards) {
    let computerDeck = [];
    let playerDeck = [];
    for (var i = 0; i < cards.length; i++) {
        if (i % 2 === 0) {
            playerDeck.push(cards[i]);
        }
        else {
            computerDeck.push(cards[i]);
        };
    };
    return { playerDeck, computerDeck };
};

function ComputerDrawsCard(computerCards, cardDrawnFunction) {
    if (computerCards.length > 0) {

        setTimeout(function () {
            let theCard = computerCards.pop();
            cardDrawnFunction(theCard);
            ComputerDrawsCard(computerCards, cardDrawnFunction);
        }, Math.floor(Math.random() * 3 + 1) * 1000);
    };
};

function PlayerDrawsCard(playerCards, playerDrawFunction) {
    if (playerCards.length > 0) {

        setTimeout(function () {
            let playerCard = playerCards.pop();
            playerDrawFunction(playerCard);
            PlayerDrawsCard(playerCards, playerDrawFunction);
        }, Math.floor(Math.random() * 3 + 1) * 1000);
    };
};

function ScorePoint(card1, card2) {
    if (card1[0] === card2[0] || card1[1] === card2[1]) {
        return 1;
    }
    else {
        return -1;
    };
};


let gameState = {
    score: 0,
    currentComputerCard: null,
    decks: DealCards(shuffle(CreateDeck())),
};

ComputerDrawsCard(gameState.decks.computerDeck, function (theCard) {
    gameState.currentComputerCard = theCard;
});

setTimeout(function () {
    console.log("Start!");
    PlayerDrawsCard(
        gameState.decks.playerDeck,
        function (theCard) {
            gameState.score += ScorePoint(theCard, gameState.currentComputerCard);
            let p = document.querySelector("#score");
            p.textContent = gameState.score;
        }
    );
}, 3000);
