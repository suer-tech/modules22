document.addEventListener('DOMContentLoaded', () => {
    const getTimezoneButton = document.getElementById('getTimezoneButton');
    const timezoneInfo = document.getElementById('timezoneInfo');
  
    getTimezoneButton.addEventListener('click', () => {
      // Проверяем доступность Geolocation API
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Получаем координаты местоположения пользователя
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            // Формируем URL для запроса к Timezone API
            const apiKey = '32bcd4a6e4b548968e7afcdb682ac679';
            const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${latitude}&long=${longitude}`;
  
            // Отправляем запрос к API
            fetch(apiUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Ошибка при получении данных');
                }
                return response.json();
              })
              .then(data => {
                // Выводим информацию о временной зоне и времени на страницу
                const timezone = data.timezone;
                const localDateTime = data.date_time_txt;
  
                timezoneInfo.innerHTML = `
                  <p>Временная зона: ${timezone}</p>
                  <p>Местное дата и время: ${localDateTime}</p>
                `;
              })
              .catch(error => {
                timezoneInfo.textContent = `Произошла ошибка: ${error.message}`;
              });
          },
          () => {
            // Если пользователь отказался от доступа к местоположению
            timezoneInfo.textContent = "Информация о местоположении недоступна";
          }
        );
      } else {
        // Если Geolocation API недоступен в браузере
        timezoneInfo.textContent = "Информация о местоположении недоступна";
      }
    });
  });
  