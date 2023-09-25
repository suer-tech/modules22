// Получаем кнопку и иконку
const iconButton = document.getElementById('iconButton');
const icon = iconButton.querySelector('.icon');

// Флаг для отслеживания текущей иконки
let isIcon01 = true;

// Функция для переключения иконок
function toggleIcon() {
  isIcon01 = !isIcon01;
  if (isIcon01) {
    icon.classList.remove('icon-02');
    icon.classList.add('icon-01');
  } else {
    icon.classList.remove('icon-01');
    icon.classList.add('icon-02');
  }
}

// Обработчик события клика на кнопке
iconButton.addEventListener('click', toggleIcon);
