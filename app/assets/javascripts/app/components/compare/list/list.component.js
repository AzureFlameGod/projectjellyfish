(function () {
  'use strict';

  angular.module('components.compare')
    .component('compareList', {
      templateUrl: 'components/compare/list/list.html',
      controller: 'CompareListController',
      bindings: {
        onAddToCart: '&?'
      }
    });
})();
