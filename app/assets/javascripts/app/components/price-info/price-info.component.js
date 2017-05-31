(function () {
  'use strict';

  angular.module('components.price-info')
    .component('priceInfo', {
      templateUrl: 'components/price-info/price-info.html',
      bindings: {
        object: '<'
      }
    });
})();
