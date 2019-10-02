'use strict';
// константы для координат пинов
var MAP_X_MIN = 0;
var MAP_X_MAX = document.querySelector('.map').clientWidth;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
// константа для генерациии пинов
var PINS_QUANTITY = 8;
// переменные рабочей области
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var elementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
// данные
var adTypes = ['palace', 'flat', 'house', 'bungalo'];
var chekinVariants = ['12:00', '13:00', '14:00'];
var checkoutVariants = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


// выбирает случайный элемент массива
var getRandomItem = function (arr) {
  var randomEl = arr[Math.floor(Math.random() * (arr.length))];
  return randomEl;
};

// выбирает случайное число из диапазона
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// добавляет ведущий ноль
var addLeadZero = function (number) {
  number = (number < 10) ? '0' + number : number;
  return number;
};

// получить множество подмножеств массива
var getCombinations = function (array) {
  var result = [];

  var getSubset = function (index, subset) {
    if (index === array.length) {
      result.push(subset);
      return;
    }
    getSubset(index + 1, subset.concat([array[index]]));
    getSubset(index + 1, subset);
  };

  getSubset(0, []);
  return result;
};

// создаем пины нужной структуры
var createPins = function () {
  var pins = [];
  for (var i = 0; i < PINS_QUANTITY; i++) {
    pins[i] = {
      author: {
        avatar: 'img/avatars/user' + addLeadZero(i + 1) + '.png'
      },
      offer: {
        title: 'Объявление №' + i,
        address: pins[i] + ',' + pins[i],
        price: 1,
        type: getRandomItem(adTypes),
        rooms: 1,
        guests: 1,
        checkin: getRandomItem(chekinVariants),
        checkout: getRandomItem(checkoutVariants),
        features: getRandomItem(getCombinations(features)),
        description: 'Описание',
        photos: photos
      },
      location: {
        x: 0,
        y: 0
      },
    };
  }
  return pins;
};

// наполняем шаблон пина данными
var fillAdTemplate = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elementTemplate.cloneNode(true);
    var coordinateX = randomInteger(MAP_X_MIN, MAP_X_MAX);
    var coordinateY = randomInteger(MAP_Y_MIN, MAP_Y_MAX);
    elements[i].location.x = coordinateX;
    elements[i].location.y = coordinateY;
    elements[i].offer.address = coordinateX + ',' + coordinateY;
    element.style.left = (elements[i].location.x - PIN_WIDTH / 2) + 'px';
    element.style.top = (elements[i].location.y - PIN_HEIGHT) + 'px';
    element.setAttribute('alt', elements[i].offer.description);
    element.querySelector('img').setAttribute('src', elements[i].author.avatar);
    fragment.appendChild(element);
  }
  return fragment;
};

// инициализация
createPins();
fillAdTemplate(createPins());
map.classList.remove('map--faded');
mapPins.appendChild(fragment);

