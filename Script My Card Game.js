$(function () {
    var timerClock = null;
    var paused = false;

    function ScorePoint(card1, card2) {
        if (card1[0] === card2[0] || card1[1] === card2[1]) {
            return 1;
        }
        else {
            return -1;
        };
    };

    $("button.newGame").click(function () {
        $(".card").show();
        paused = false;
        timerClock = startTimer($("#timer"));
        $("#player".click(function () {
            if (paused === false && computerCard !== undefined) {

                $.getJSON(baseUrl + deckID + "/draw/")
                    .done(function (draw) {
                        setPlayerCard(draw.cards[0]);
                        $("#score").text(parseInt($("#score").text()) + ScorePoint(playerCard, computerCard));
                        clearTimeout(computerTimer);
                        SetNewComputerCard();
                    })
                    .fail(function () {
                        aler("Player Draw Failed");
                    });
                $("#played").show(1500, function () {
                    $("#played").hide();
                });
            };
        });
    });

    $("button.pauseGame").click(function () {
        if (paused === false) {
            pauseTimer(timerClock);
            paused = true;
        }
        else if (paused === true) {
            paused = false;
            startTimer($("#timer"));
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
    let computerTimer;

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
        $("#player img.card").attr("src", card.image);
    }
    function ComputerDrawsCard() {
        computerTimer = setTimeout(function () {
            SetNewComputerCard();
        }, Math.floor(Math.random() * 3 + 1) * 1000);
    };

    function SetNewComputerCard() {
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