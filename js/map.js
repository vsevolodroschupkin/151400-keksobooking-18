'use strict';

(function () {
  // константы для координат пинов
  // var MAP_X_MIN = 0;
  // var MAP_X_MAX = document.querySelector('.map').clientWidth;
  // var MAP_Y_MIN = 130;
  // var MAP_Y_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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

  // переменные рабочей области
  var main = document.body.querySelector('main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var elementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var filterForm = document.querySelector('form.map__filters');
  var pinFilters = filterForm.querySelectorAll('.map__filters > [class^=map]');
  var addressField = adForm.querySelector('#address');
  var adFormControls = adForm.querySelectorAll('.ad-form > [class^=ad-form]');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

  var setActiveMode = function (pins) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.setElementsEnabled(pinFilters);
    window.util.setElementsEnabled(adFormControls);
    fillAdTemplate(pins);
    mapPins.appendChild(fragment);
    window.util.setElementsDisabled(pinFilters);
  };

  // обработчик ошибки передачи данных
  var errorHandler = function () {
    var newElement = errorTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', newElement);
  };

  var setAddressValue = function () {
    addressField.value = Math.floor((mainPin.offsetLeft + MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor((mainPin.offsetTop + MAIN_PIN_HEIGHT / 2));
  };

  var dragMainPinHandler = function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      window.backend.load(setActiveMode, errorHandler);
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

  // глобальный объект
  window.pins = {

  };
})();
