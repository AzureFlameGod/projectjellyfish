(function () {
  'use strict';

  var component = {
    templateUrl: 'components/marketplace/cart-nav/cart-nav.html',
    controller: 'CartNavController'
  };

  angular.module('components.marketplace')
    .component('cartNav', component);
})();
