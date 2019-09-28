'use strict';
var map = document.querySelector('.map');
var MAP_X_MIN = 0;
var MAP_X_MAX = map.clientWidth;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var elementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var ADS_QUANTITY = 8;
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

var createPins = function () {
  var pins = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
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
        features: features,
        description: 'Описание',
        photos: photos
      },
      location: {
        x: randomInteger(MAP_X_MIN, MAP_X_MAX),
        y: randomInteger(MAP_Y_MIN, MAP_Y_MAX)
      },
    };
  }
  return pins;
};

var fillAdTemplate = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elementTemplate.cloneNode(true);
    element.style.left = (elements[i].location.x - element.clientWidth / 2) + 'px';
    element.style.top = (elements[i].location.y - element.clientHeight) + 'px';
    element.setAttribute('alt', elements[i].offer.title);
    element.querySelector('img').setAttribute('src', elements[i].author.avatar);
    fragment.appendChild(element);
  }
  return fragment;
};

var mapPins = document.querySelector('.map__pins');
createPins();
fillAdTemplate(createPins());
map.classList.remove('map--faded');
mapPins.appendChild(fragment);
