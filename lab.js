let el = document.querySelector("main div");

console.log(el);

el.addEventListener("click", function (event) {
    setTimeout(function () {
        console.log(event);
        let newDiv = document.createElement("div");
        el.appendChild(newDiv);
        newDiv.innerHTML = "<strong>VERY IMPORTANT!!!</strong>";
    }, 1000);
});

alert("before?");

window.alert = function (message) {
    console.log("ALERT!!!!!!!!!!!" + message);
};

alert("After!");


//function dealcards() {
    //    let computerDeck = [];
    //    let playerDeck = [];
    //    let deckID = $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/", function (data) {
    //        deckID = data.deck_id;
    //        let url = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/";
    //        console.log(url);
    //        for (var i = 0; i < deck.length; i++) {
    //            if (i % 2 === 0) {
    //                playerDeck.push(deck[i]);
    //            }
    //            else {
    //                computerDeck.push(deck[i]);
    //            };
    //        };
    //        return { playerDeck, computerDeck };
    //    });
    //};

    //function ComputerDrawsCard(computerCards, cardDrawnFunction) {
    //    if (computerCards.length > 0) {

    //        setTimeout(function () {
    //            let theCard = computerCards.pop();
    //            cardDrawnFunction(theCard);
    //            ComputerDrawsCard(computerCards, cardDrawnFunction);
    //        }, Math.floor(Math.random() * 3 + 1) * 1000);
    //    };
    //};

    //function PlayerDrawsCard(playerCards, playerDrawFunction) {
    //    if (playerCards.length > 0) {

    //        setTimeout(function () {
    //            let playerCard = playerCards.pop();
    //            playerDrawFunction(playerCard);
    //            PlayerDrawsCard(playerCards, playerDrawFunction);
    //        }, Math.floor(Math.random() * 3 + 1) * 1000);
    //    };
    //};


    //function playGame() {
    //    let gameState = {
    //        score: 0,
    //        currentComputerCard: null,
    //        decks: dealcards(),
    //    };

    //    ComputerDrawsCard(gameState.decks.computerDeck, function (theCard) {
    //        gameState.currentComputerCard = theCard;
    //    });

    //    setTimeout(function () {
    //        console.log("Start!");
    //        PlayerDrawsCard(
    //            gameState.decks.playerDeck,
    //            function (theCard) {
    //                gameState.score += ScorePoint(theCard, gameState.currentComputerCard);
    //                let p = document.querySelector("#score");
    //                p.textContent = gameState.score;
    //            }
    //        );
    //    }, 3000);
    //};