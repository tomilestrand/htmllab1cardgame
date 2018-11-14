$(function () {

    var $cards = $(".card");
    var $newGameButton = $("button.newGame");
    var $pauseGameButton = $("button.pauseGame");
    var $timer = $("#timer");
    var timer = null;
    var $playerCards = $("#player");
    var $played = $("#played")

    $newGameButton.click(function () {
        playGame();
        $cards.show();
        timer = startTimer($timer);
        $playerCards.addClass("playCard");
        var $playCard = $(".playCard");
        $playCard.click(function () {
            console.log("Hi!");
            $played.show(2500, function () {
                $played.hide();
            });
        });
    });

    $pauseGameButton.click(function () {
        pauseTimer(timer);
    });


    function startTimer($timer) {
        var timer = setInterval(function () {
            $timer.text(parseInt($timer.text()) + 1);
        }, 1000)
        return timer;
    };

    function pauseTimer(timer) {
        clearInterval(timer);
        $playerCards.removeClass("playCard");
        $playCard.off("click", function () {
            console.log("Hi!");
            $played.show(2500, function () {
                $played.hide();
            });
        });
    };
});