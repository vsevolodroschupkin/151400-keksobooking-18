'use strict';
// константы для координат пинов
var MAP_X_MIN = 0;
var MAP_X_MAX = document.querySelector('.map').clientWidth;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AD_NUMBER_MIN = 1;
var AD_NUMBER_MAX = 1000;
var GUEST_NUMBER_MIN = 1;
var GUEST_NUMBER_MAX = 20;
var ROOM_NUMBER_MIN = 1;
var ROOM_NUMBER_MAX = 20;
var PRICE_MIN = 1;
var PRICE_MAX = 20000;

// константа для генерациии пинов
var PINS_QUANTITY = 8;

// данные
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_VARIANTS = ['12:00', '13:00', '14:00'];
var CHECKOUT_VARIANTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// переменные рабочей области
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var elementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

// выбирает случайный элемент массива
var getRandomItem = function (arr) {
  var randomEl = arr[Math.floor(Math.random() * (arr.length))];
  return randomEl;
};

// выбирает случайное число из диапазона
var getRandomInteger = function (min, max) {
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
    // для каждого пина генерим случайные координаты
    var coordinateX = getRandomInteger(MAP_X_MIN, MAP_X_MAX);
    var coordinateY = getRandomInteger(MAP_Y_MIN, MAP_Y_MAX);

    pins[i] = {
      author: {
        avatar: 'img/avatars/user' + addLeadZero(i + 1) + '.png'
      },
      offer: {
        title: 'Объявление №' + getRandomInteger(AD_NUMBER_MIN, AD_NUMBER_MAX),
        address: coordinateX + ', ' + coordinateY,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        type: getRandomItem(AD_TYPES),
        rooms: getRandomInteger(ROOM_NUMBER_MIN, ROOM_NUMBER_MAX),
        guests: getRandomInteger(GUEST_NUMBER_MIN, GUEST_NUMBER_MAX),
        checkin: getRandomItem(CHECKIN_VARIANTS),
        checkout: getRandomItem(CHECKOUT_VARIANTS),
        features: getRandomItem(getCombinations(FEATURES)),
        description: 'Объявление',
        photos: getRandomItem(getCombinations(PHOTOS))
      },
      location: {
        x: coordinateX,
        y: coordinateY
      },
    };
  }
  return pins;
};

// наполняем шаблон пина данными
var fillAdTemplate = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elementTemplate.cloneNode(true);
    element.style.left = (elements[i].location.x - PIN_WIDTH / 2) + 'px';
    element.style.top = (elements[i].location.y - PIN_HEIGHT) + 'px';
    element.setAttribute('alt', elements[i].offer.title + ', находится по адресу: ' + elements[i].offer.address);
    element.querySelector('img').setAttribute('src', elements[i].author.avatar);
    fragment.appendChild(element);
  }
  return fragment;
};

// инициализация
fillAdTemplate(createPins());
map.classList.remove('map--faded');
mapPins.appendChild(fragment);

