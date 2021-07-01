// echo websocket
const wsUri = "wss://echo.websocket.org/";

// нахождение кнопок в html
const btnGeolocation = document.querySelector('.geolocation_echo');
const btnSend = document.querySelector('.submit_echo');
const output = document.getElementById("output");
const input = document.querySelector('.input_echo_btn');

// создание websocket
let websocket = new WebSocket(wsUri);

// вывод сообщениий
function writeToScreen(message) {
    let write = document.createElement("p");
    write.style.wordWrap = "break-word";
    write.innerHTML = message;
    output.appendChild(write);
}

// обработчик ошибок
websocket.onerror = function(evt) {
    writeToScreen(
        '<p class="err_websocket" </p> ' + evt.data
    );
};

// сообщение сервера
websocket.onmessage = function(evt) {
    writeToScreen(
        '<p class="output_left"</p>' + evt.data
    );
};

// сообщение пользователя
btnSend.addEventListener('click', () => {
    const message = input.value;
    if (message) {
        writeToScreen(`<p class="output_right">${message}</p>`);
        websocket.send(message);
        input.value = '';
    }
});

// блок геолокации

// геолокация успешно найдена
const success = (position) => {
    console.log('position', position);
    // широта и долгота
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    writeToScreen(`
    <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank" >
        https://www.openstreetmap.org/#map=18/${latitude}/${longitude}
    </a>`);
};

// ошибка геолокации
const error = () => {
    writeToScreen('Невозможно получить ваше местоположение');
};

// событие на кнопке определения геолокации
btnGeolocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen('что-то не так с определением вашей геолокации');
    } else {
        writeToScreen(`<p class="output_right_geo">Гео-локация</p>`);
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
