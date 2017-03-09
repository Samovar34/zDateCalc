console.log("Z DATE CALC V0.1");


window.onload = function () {
    // переменные
    var inputBlock = $("#input-block");
    var resultBlock = $("#result-block");
    var calcButton = $("#calc-btn");

    var id6 = $("#id6"); // вывод результата (дата)
    var id7 = $("#id7"); // вывод результата (время)

    // обработка ввода
    inputBlock.on("mousedown", mainHnadler);

    // Отмена событий по умолчанию
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

    // обработка нажатий кнопки
    calcButton.on("click", function () {
        if (resultBlock.css("display") === "none") {
            showResult(inputModule.calculate());
            calcButton.html("скрыть");
        } else {
            hideResult();
            calcButton.html("Расчет");
        }
        

    });

    // обработка ввода
    function mainHnadler(e) {
        e.preventDefault();

        var $target = $(e.target);

        if ($target.data("elem")) {
           inputModule.handleInput($target.data("elem"), $target.data("action"));
        }
    }

    // Показать результат
    function showResult(date) {
        resultBlock.css("display", "block");
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var min = date.getMinutes();

        id6.html(day + "-" + month + "-" + year);
        id7.html(hours + "-" + min);
    }

    // скрыть результат
    function hideResult() {
        resultBlock.css("display", "none");
        id6.html(" ");
        id7.html(" ");
    }
}