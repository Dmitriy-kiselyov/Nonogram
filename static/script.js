document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('data');
    form.onsubmit = function (e) {
        e.preventDefault();
        var url = document.getElementById('input').value;

        makeAjaxRequest(url);
    };

    function makeAjaxRequest(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/solve?url=' + url, true);

        xhr.onerror = onError;
        xhr.onload = function () {
            var answer = JSON.parse(xhr.responseText);

            switch (answer.status) {
                case 'ok':
                    drawNonogram(answer.result);
                    break;
                case 'error':
                    onFail(answer.message);
                    break;
                default:
                    onError();
            }
        };

        xhr.send();
    }

    function drawNonogram(nonogram) {
        function newDiv(className, background) {
            var div = document.createElement("div");
            div.className = className;
            if (background)
                div.style.backgroundColor = background;
            return div;
        }

        var field = document.getElementById("field");
        field.innerHTML = "";

        nonogram.field.forEach(function (line) {
            var row = newDiv('field__row');

            Array.prototype.forEach.call(line, function (ch) {
                if (ch !== '.' && ch !== '?' && !ch.match(/[a-z]/))
                    return;

                switch (ch) {
                    case '.':
                        row.appendChild(newDiv("field__cell", "white"));
                        break;
                    case '?':
                        row.appendChild(newDiv("field__cell field__empty"));
                        break;
                    default:
                        row.appendChild(newDiv("field__cell", nonogram.colors[ch.charCodeAt(0) - 97]));
                }
            });

            field.appendChild(row);
        });
    }

    function onFail(message) {
        console.log('FAIL', message);
    }

    function onError() {
        console.log('ERROR');
    }
});
