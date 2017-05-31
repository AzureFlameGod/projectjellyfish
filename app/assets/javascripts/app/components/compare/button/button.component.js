(function () {
  'use strict';

  angular.module('components.compare')
    .component('compareButton', {
      templateUrl: 'components/compare/button/button.html',
      controller: 'CompareButtonController',
      bindings: {
        item: '<'
      }
    });
})();
