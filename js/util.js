'use strict';

// util.js
(function () {
  var ENTER_KEYCODE = 13;
  window.util = {
    // выбирает случайный элемент массива
    getRandomItem: function (arr) {
      var randomEl = arr[Math.floor(Math.random() * (arr.length))];
      return randomEl;
    },
    // выбирает случайное число из диапазона
    getRandomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    // добавляет ведущий ноль
    addLeadZero: function (number) {
      number = (number < 10) ? '0' + number : number;
      return number;
    },
    // получает множество подмножеств массива
    getCombinations: function (array) {
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
    },
    setElementsEnabled: function (elements) {
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].disabled = false;
        }
      }
    },
    setElementsDisabled: function (elements) {
      if (elements) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].disabled = true;
        }
      }
    },
    // обработчик enter
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
  };
})();
