document.addEventListener('DOMContentLoaded', () => {
    const userInfoButton = document.getElementById('userInfoButton');
    const userInfo = document.getElementById('userInfo');
  
    userInfoButton.addEventListener('click', () => {
      // Получаем размеры экрана
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      userInfo.textContent = `Размеры экрана: ${screenWidth}x${screenHeight}`;
  
      // Проверяем доступность Geolocation API
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Получаем координаты местоположения пользователя
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            userInfo.textContent += `\nМестоположение пользователя: Широта ${latitude}, Долгота ${longitude}`;
          },
          () => {
            // Если пользователь отказался от доступа к местоположению
            userInfo.textContent += "\nИнформация о местоположении недоступна";
          }
        );
      } else {
        // Если Geolocation API недоступен в браузере
        userInfo.textContent += "\nИнформация о местоположении недоступна";
      }
    });
  });
  