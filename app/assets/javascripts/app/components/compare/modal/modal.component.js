(function () {
  'use strict';

  angular.module('components.compare')
    .component('compareModal', {
      templateUrl: 'components/compare/modal/modal.html',
      controller: 'CompareModalController',
      bindings: {
        items: '<',
        title: '@?heading',
        onCancel: '&?'
      }
    });
})();
