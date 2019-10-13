'use strict';

(function () {
  var ROOM_CAPACITY = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormControls = adForm.querySelectorAll('.ad-form > [class^=ad-form]');

  // поля формы объявления
  var addressField = adForm.querySelector('#address');
  var roomsField = adForm.querySelector('#room_number');
  var guestsField = adForm.querySelector('#capacity');
  var submit = adForm.querySelector('button[type="submit"]');

  var validateGuestNumber = function () {
    var guestNumber = guestsField.value;
    var roomNumber = roomsField.value;

    if (!ROOM_CAPACITY[roomNumber].includes(guestNumber)) {
      guestsField.setCustomValidity('Количество комнат не соответствует количеству гостей.');
      return;
    }
    guestsField.setCustomValidity('');
  };

  var validateFields = function () {
    validateGuestNumber();
  };

  validateGuestNumber();
  window.util.setElementsDisabled(adFormControls);
  addressField.value = Math.floor((mainPin.offsetLeft + window.map.MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor((mainPin.offsetTop + window.map.MAIN_PIN_WIDTH / 2));

  // глобальный объект
  window.form = {
    validateGuestNumber: validateGuestNumber
  };

  // обработчики
  submit.addEventListener('click', validateFields);
})();
