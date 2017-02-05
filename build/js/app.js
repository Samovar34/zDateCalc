console.log("Z DATE CALC V0.0.1");

window.onload = function () {
    var inputBlock = $("#input-block");

    inputBlock.on("mousedown", function (e) {
        console.log("click");
        e.preventDefault();
    });

    inputBlock.on("dblclick", function (e) {
        console.log("dblclick");
        e.preventDefault();
    });

    inputBlock.on("selectstart", function (e) {
        console.log("selectstart");
        e.preventDefault();
    });

    window.onclick = function (e) {
        e.preventDefault();
    }

    window.ondblclick = function (e) {
        e.preventDefault();
    }


}