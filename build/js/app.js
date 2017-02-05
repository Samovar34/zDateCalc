console.log("Z DATE CALC V0.0.1");


window.onload = function () {
    var inputBlock = $("#input-block");
    var calcButton = $("#calc-btn");

    inputBlock.on("mousedown", mainHnadler);

    inputBlock.on("dblclick", function (e) {
        e.preventDefault();
    });

    inputBlock.on("selectstart", function (e) {
        e.preventDefault();
    });

    window.onclick = function (e) {
        e.preventDefault();
    }

    window.ondblclick = function (e) {
        e.preventDefault();
    }

    calcButton.on("click", inputModule.calculate);

    function mainHnadler(e) {
        e.preventDefault();

        var $target = $(e.target);

        console.log(typeof $target.data("action"));

        if ($target.data("elem")) {
           inputModule.handleInput($target.data("elem"), $target.data("action"));
        }
    }


}