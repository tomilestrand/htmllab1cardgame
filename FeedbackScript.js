$(function () {

    $(".radio").click(function () {
        $("form .radio").submit();
        $("#stars").empty();
        let value = $("input[name='satisfaction']:checked").val()
        for (var i = 0; i < value; i++) {
            $("#stars").append("*");
        }
        console.log($("input[name='satisfaction']:checked").val());
        console.log($("#name").val());
    });

    $("button").click(function () {
        $("form").submit();
    });

    $("form").submit(function (e) {
        if ($("#name").val() !== "") {

        let colorcell = $("<td>");
        let input = {
            name: $("#name").val(),
            satisfaction: $("input[name='satisfaction']:checked").val(),
            favcolor: $("#favcolor").val(),
        }; 
        console.log(input);
        colorcell.text(input.favcolor);
        colorcell.css("background-color", input.favcolor);
        let row = $("<tr><td>" + input.name + "</td><td>" + input.satisfaction + "</td>")
        row.append(colorcell);

        $("#fbtable").append(row);
        }
        e.preventDefault();
    });
});

//cell.css("background-color", input.favcolor);
//cell.text(input.favcolor);