'use strict';

(function () {
  // константы для координат пинов
  // var MAP_X_MIN = 0;
  // var MAP_X_MAX = document.querySelector('.map').clientWidth;
  // var MAP_Y_MIN = 130;
  // var MAP_Y_MAX = 630;
  // var PIN_WIDTH = 50;
  // var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;
  // var AD_NUMBER_MIN = 1;
  // var AD_NUMBER_MAX = 1000;
  // var GUEST_NUMBER_MIN = 1;
  // var GUEST_NUMBER_MAX = 20;
  // var ROOM_NUMBER_MIN = 1;
  // var ROOM_NUMBER_MAX = 20;
  // var PRICE_MIN = 1;
  // var PRICE_MAX = 20000;

  // константа для генерациии пинов
  // var PINS_QUANTITY = 8;

  // данные
  // var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  // var CHECKIN_VARIANTS = ['12:00', '13:00', '14:00'];
  // var CHECKOUT_VARIANTS = ['12:00', '13:00', '14:00'];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // переменные рабочей области
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  // var mapPins = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  // var elementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // var fragment = document.createDocumentFragment();
  var filterForm = document.querySelector('form.map__filters');
  var pinFilters = filterForm.querySelectorAll('.map__filters > [class^=map]');
  var addressField = adForm.querySelector('#address');
  var adFormControls = adForm.querySelectorAll('.ad-form > [class^=ad-form]');


  // создаем пины нужной структуры
  // var createPins = function () {
  //   var pins = [];
  //   for (var i = 0; i < PINS_QUANTITY; i++) {
  //     // для каждого пина генерим случайные координаты
  //     var coordinateX = window.util.getRandomInteger(MAP_X_MIN, MAP_X_MAX);
  //     var coordinateY = window.util.getRandomInteger(MAP_Y_MIN, MAP_Y_MAX);

  //     pins[i] = {
  //       author: {
  //         avatar: 'img/avatars/user' + window.util.addLeadZero(i + 1) + '.png'
  //       },
  //       offer: {
  //         title: 'Объявление №' + window.util.getRandomInteger(AD_NUMBER_MIN, AD_NUMBER_MAX),
  //         address: coordinateX + ', ' + coordinateY,
  //         price: window.util.getRandomInteger(PRICE_MIN, PRICE_MAX),
  //         type: window.util.getRandomItem(AD_TYPES),
  //         rooms: window.util.getRandomInteger(ROOM_NUMBER_MIN, ROOM_NUMBER_MAX),
  //         guests: window.util.getRandomInteger(GUEST_NUMBER_MIN, GUEST_NUMBER_MAX),
  //         checkin: window.util.getRandomItem(CHECKIN_VARIANTS),
  //         checkout: window.util.getRandomItem(CHECKOUT_VARIANTS),
  //         features: window.util.getRandomItem(window.util.getCombinations(FEATURES)),
  //         description: 'Объявление',
  //         photos: window.util.getRandomItem(window.util.getCombinations(PHOTOS))
  //       },
  //       location: {
  //         x: coordinateX,
  //         y: coordinateY
  //       },
  //     };
  //   }
  //   return pins;
  // };

  // наполняем шаблон пина данными
  // var fillAdTemplate = function (elements) {
  //   for (var i = 0; i < elements.length; i++) {
  //     var element = elementTemplate.cloneNode(true);
  //     element.style.left = (elements[i].location.x - PIN_WIDTH / 2) + 'px';
  //     element.style.top = (elements[i].location.y - PIN_HEIGHT) + 'px';
  //     element.setAttribute('alt', elements[i].offer.title + ', находится по адресу: ' + elements[i].offer.address);
  //     element.querySelector('img').setAttribute('src', elements[i].author.avatar);
  //     fragment.appendChild(element);
  //   }
  //   return fragment;
  // };


  // fillAdTemplate(createPins());
  // mapPins.appendChild(fragment);
  window.util.setElementsDisabled(pinFilters);

  var setActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.setElementsEnabled(pinFilters);
    window.util.setElementsEnabled(adFormControls);
  };

  var setAddressValue = function () {
    addressField.value = Math.floor((mainPin.offsetLeft + MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor((mainPin.offsetTop + MAIN_PIN_HEIGHT / 2));
  };

  var dragMainPinHandler = function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      setActiveMode();
    }
    setAddressValue();
  };

  // глобальный объект
  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
  };

  // уставновка обработчиков
  mainPin.addEventListener('mousedown', dragMainPinHandler);
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setActiveMode);
  });
})();
