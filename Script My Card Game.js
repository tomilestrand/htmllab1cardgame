$(function () {
    function dealcards() {
        let computerDeck = [];
        let playerDeck = [];
        let deckID = $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/", function (data) {
            deckID = data.deck_id;
            let url = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/";
            console.log(url);
            for (var i = 0; i < deck.length; i++) {
                if (i % 2 === 0) {
                    playerDeck.push(deck[i]);
                }
                else {
                    computerDeck.push(deck[i]);
                };
            };
            return { playerDeck, computerDeck };
        });
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

    function playGame() {
        let gameState = {
            score: 0,
            currentComputerCard: null,
            decks: dealcards(),
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
    };

    var $cards = $(".card");
    var $newGameButton = $("button.newGame");
    var $pauseGameButton = $("button.pauseGame");
    var $timer = $("#timer");
    var timer = null;
    var $playerCards = $("#player");
    var $played = $("#played")
    var paused = false;

    $newGameButton.click(function () {
        $cards.show();
        paused = false;
        timer = startTimer($timer);
        $playerCards.addClass("playCard");
        $(".playCard").click(function () {
            if (paused === false && computerCard !== undefined) {

                $.getJSON(baseUrl + deckID + "/draw/")
                    .done(function (draw) {
                        setPlayerCard(draw.cards[0]);
                        $("#score").text(parseInt($("#score").text()) + ScorePoint(playerCard, computerCard))
                    });
                $played.show(2500, function () {
                    $played.hide();
                });
            };
        });
    });

    $pauseGameButton.click(function () {
        if (paused === false) {
            pauseTimer(timer);
            paused = true;
            $playerCards.removeClass("playCard");
            $(".playCard").off("click");
        }
        else if (paused === true) {
            paused = false;
            startTimer($timer);
            ComputerDrawsCard();
        }

    });



    function startTimer($timer) {
        var timer = setInterval(function () {
            $timer.text(parseInt($timer.text()) + 1);
        }, 1000)
        return timer;
    };

    function pauseTimer(timer) {
        clearInterval(timer);
    };
    let deckID;
    let playerCard;
    let computerCard;
    const baseUrl = "https://deckofcardsapi.com/api/deck/"

    $(".newGame").click(function () {
        $.getJSON(baseUrl + "new/shuffle/")
            .done(function (deck) {
                deckID = deck.deck_id;
                $.getJSON(baseUrl + deckID + "/draw/")
                    .done(function (draw) {
                        setPlayerCard(draw.cards[0])

                        ComputerDrawsCard();
                    })
                    .fail(function () {
                        alert("Player draw failed");
                    });
            });
    });
    function setPlayerCard(card) {
        playerCard = card.code;
        $("#player img.card").attr("src", card.image)
    }
    function ComputerDrawsCard() {
        setTimeout(function () {
            $.getJSON(baseUrl + deckID + "/draw/")
                .done(function (draw) {
                    computerCard = draw.cards[0].code;
                    $("#computer img.card").attr("src", draw.cards[0].image);
                    if (paused === false) {
                        ComputerDrawsCard();
                    }
                })
                .fail(function () {
                    alert("Computer draw failed");
                });
        }, Math.floor(Math.random() * 3 + 1) * 1000);
    };
});

//function ComputerDrawsCard(computerCards, cardDrawnFunction) {
//    if (computerCards.length > 0) {

//        setTimeout(function () {
//            let theCard = computerCards.pop();
//            cardDrawnFunction(theCard);
//            ComputerDrawsCard(computerCards, cardDrawnFunction);
//        }, Math.floor(Math.random() * 3 + 1) * 1000);
//    };
//};

//setTimeout(function () {
//    $.getJSON(baseUrl + deckID + "/draw/")
//        .done(function (computerDraw) {
//            computerCard = computerDraw.cards[0].code;
//            $("#computer img.card").attr("src", computerDraw.cards[0].image);
//        })
//}, 1500);