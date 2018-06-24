document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('data');
    form.onsubmit = function (e) {
        e.preventDefault();
        var url = document.getElementById('input').value;

        hideError();
        clearNonogram();
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
                    onSuccess(answer.result);
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

    function onSuccess(nonogram) {
        drawNonogram(nonogram);
    }

    function onFail(message) {
        showError(message);
    }

    function onError() {
        showError('Ошибка сервера');
    }

    function hideError() {
        var error = document.getElementById('field-error');
        error.style.display = 'none';
    }

    function showError(message) {
        var error = document.getElementById('field-error');
        error.innerText = message;
        error.style.display = 'block';
    }

    function clearNonogram() {
        var field = document.getElementById("field");
        field.innerHTML = "";
    }

    function drawNonogram(nonogram) {
        function newDiv(className) {
            var div = document.createElement("div");
            div.className = className;
            return div;
        }

        function newCell(background) {
            var cell = newDiv('field__cell');
            if (background) {
                cell.style.backgroundColor = background;
            } else {
                cell.classList.add('field__empty-cell');
            }

            var size = Math.min(Math.floor(800 / nonogram.width), 10);
            cell.style.width = size + 'px';
            cell.style.height = size + 'px';

            return cell;
        }

        var field = document.getElementById("field");

        nonogram.field.forEach(function (line) {
            var row = newDiv('field__row');

            Array.prototype.forEach.call(line, function (ch) {
                if (ch !== '.' && ch !== '?' && !ch.match(/[a-z]/))
                    return;

                switch (ch) {
                    case '.':
                        row.appendChild(newCell('white'));
                        break;
                    case '?':
                        row.appendChild(newCell());
                        break;
                    default:
                        row.appendChild(newCell(nonogram.colors[ch.charCodeAt(0) - 97]));
                }
            });

            field.appendChild(row);
        });
    }
});
