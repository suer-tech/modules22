document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const geoLocationButton = document.getElementById('geoLocationButton');
  
    // WebSocket соединение с эхо-сервером
    const socket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
  
    // Функция для добавления сообщения в окно чата
    function addMessage(messageText, isSent = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message${isSent ? ' sent' : ''}`;
      messageDiv.textContent = messageText;
      chatWindow.appendChild(messageDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight; // Прокрутка вниз
    }
  
    // Обработчик события клика на кнопке "Отправить"
    sendMessageButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message) {
        addMessage(message, true);
  
        // Отправка сообщения на эхо-сервер через WebSocket
        socket.send(JSON.stringify({ message }));
  
        messageInput.value = '';
      }
    });
  
    // Обработчик события клика на кнопке "Гео-локация"
    geoLocationButton.addEventListener('click', () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            // Создание ссылки на OpenStreetMap с координатами
            const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
            addMessage(`Гео-локация: <a href="${mapLink}" target="_blank">${mapLink}</a>`);
          },
          () => {
            addMessage('Информация о местоположении недоступна');
          }
        );
      } else {
        addMessage('Информация о местоположении недоступна');
      }
    });
  
    // Обработчик события при открытии соединения WebSocket
    socket.addEventListener('open', (event) => {
      addMessage('WebSocket соединение установлено.');
    });
  
    // Обработчик события при получении сообщения от WebSocket
    socket.addEventListener('message', (event) => {
      const receivedMessage = JSON.parse(event.data);
      addMessage(receivedMessage.message);
    });
  
    // Обработчик события при закрытии соединения WebSocket
    socket.addEventListener('close', (event) => {
      addMessage('WebSocket соединение закрыто.');
    });
  
    // Обработчик события при ошибке WebSocket
    socket.addEventListener('error', (event) => {
      addMessage('Произошла ошибка WebSocket.');
    });
  });
  