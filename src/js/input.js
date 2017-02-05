var inputModule = (function () {
    var cache = {};



    // текущий год
    var year = null;

    // проверка на високосный год
    // если год делется на 4 без остатка то високосный

    // максимальное число месяца
    var maxDate = {
        "0" : 31, // янв
        "1" : 28, // фев
        "2" : 31, // мар
        "3" : 30, // апр
        "4" : 31, // май
        "5" : 30, // июн
        "6" : 31, // июл
        "7" : 31, // авг
        "8" : 30, // сен
        "9" : 31, // окт
        "10" : 30, // ноя
        "11" : 31, // дек
    }

    // заполним кеш полями ввода
    cache["id0"] = $("#id0"); // день начала
    cache["id1"] = $("#id1"); // месяц начала
    cache["id2"] = $("#id2"); // часы начала
    cache["id3"] = $("#id3"); // минуты начала
    cache["id4"] = $("#id4"); // часы контрольного времени
    cache["id5"] = $("#id5"); // минуты контрольного времени

    // получить текущую дату и установить время
    var curDate = getAndSetDate();

    // отобразим текущую дату в полях ввода
    cache["id0"].html(curDate.day);
    cache["id1"].html(curDate.month);
    cache["id2"].html(curDate.hours);
    cache["id3"].html(curDate.minutes);

    // Обработка ввода
    function handleInput(id, action) {
        // если нет такого элемента, то добавить в кеш
        if (!cache[id]) {
            cache[id] = $("#" + id);
        }

        // получает текущее значение поля
        var curValue = parseFloat(cache[id].html());

        // проверка условий ввода (день/месяц)
        var isDate = id == "id0";
        var isMonth = id == "id1";

        // проверка условий ввода (+/-)
        if (action == "1") {
            curValue++;

            // если прибавляем день
            if (isDate) {
                // получаем текущий месяц
                var curMonth = parseFloat(cache["id1"].html()) - 1;

                // получаем максимально возможное число в месяце
                var _maxeDate = maxDate[curMonth + ""];

                // если февраль
                if (curMonth == 1) {
                    // если високосный год, то _maxDate = 29
                    if (year % 4 == 0) {
                        _maxeDate++;
                    }
                }

                // проверка на максимальное значение дня для текущего месяца
                if (curValue > _maxeDate) {
                    curValue = cache[id].data("min")
                }

            // обычная обработка ввода
            } else {
                if (curValue > cache[id].data("max")) {
                    curValue = cache[id].data("min")
                }
            } 
        } else {
            curValue--;

            // если прибавляем день
            if (isDate) {
                // получаем текущий месяц
                var curMonth = parseFloat(cache["id1"].html()) - 1;

                // получаем максимально возможное число в месяце
                var _maxeDate = maxDate[curMonth + ""];
                
                // если февраль
                if (curMonth == 1) {
                    // если високосный год, то _maxDate = 29
                    if (year % 4 == 0) {
                        _maxeDate++;
                    }
                }


                // проверка на максимальное значение дня для текущего месяца
                if (curValue < cache[id].data("min")) {
                    curValue = _maxeDate;
                }

            // обычная обработка ввода
            } else {
                if (curValue < cache[id].data("min")) {
                    curValue = cache[id].data("max")
                }
            }
        }

        // проверка максимально числа при вводе месяца 
        if (isMonth) {
            // получаем максимально возможное число в месяце
            var curMonth = curValue - 1;
            var _maxeDate = maxDate[curMonth + ""];

            // если февраль
            if (curMonth == 1) {
                // если високосный год, то _maxDate = 29
                if (year % 4 == 0) {
                    _maxeDate++;
                }
            }
            // если текущее число больше максимально возможного, то текущее число равно максимально возможному
            if (parseFloat(cache["id0"].html()) > _maxeDate) {
                cache["id0"].html(_maxeDate);
            }
        }

        // если число меньше 10, то добавить 0 к числу
        // val = 9 => res = 09
        if (curValue < 10) {
            cache[id].html("0" + curValue);
        } else {
            cache[id].html(curValue);
        }
    }

    // возвращает дату в читаемом виде и устанавливает год
    function getAndSetDate() {
        var date = new Date;
        var _day = checkDate(date.getDate(), false);
        var _month = checkDate(date.getMonth(), true);
        var _hours = checkDate(date.getHours(), false);
        var _minutes = checkDate(date.getMinutes(), false);

        year = date.getFullYear();

        return {
            day: _day,
            month: _month,
            hours: _hours,
            minutes: _minutes
        }

    }

    // если число меньше 10 то установит 0 в начало
    // val = 9, result = 09;
    // Если isMonth true, то +1 к значению
    function checkDate(val, isMonth) {
        if (isMonth) {
            val++;
        }
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    }

    // получение данных с полей ввода
    function readDate() {
        var _day = parseFloat(cache["id0"].html());
        var _month = parseFloat(cache["id1"].html()) - 1;
        var _hours = parseFloat(cache["id2"].html());
        var _minutes = parseFloat(cache["id3"].html());
        var _targetHours = parseFloat(cache["id4"].html());
        var _targetMinutes = parseFloat(cache["id5"].html());

        return {
            day: _day,
            month: _month,
            hours: _hours,
            minutes: _minutes,
            targetHours: _targetHours,
            targetMinutes: _targetMinutes
        }    
    }

    function calculate() {
        var inputData = readDate();
        var startTime = (new Date(year, inputData.month, inputData.day, inputData.hours, inputData.minutes)).getTime();

        var targetTime = inputData.targetHours * 60 * 60 * 1000 + inputData.targetMinutes * 60 * 1000;

        var endTime = startTime + targetTime;

        var endDate = new Date(endTime);

        __printDate(endDate);

        return endDate;


    }

    // метод для контроля даты
    function __printDate(startDate) {
        console.log(startDate.getFullYear());
        console.log(startDate.getMonth());
        console.log(startDate.getDate());
        console.log(startDate.getHours());
        console.log(startDate.getMinutes());
        console.log(startDate.getSeconds());
    }

    return {
        handleInput: handleInput,
        calculate: calculate
    };
})();