(function () {
  'use strict';

  angular.module('components.filter')
    .component('policies', {
      templateUrl: 'components/filter/policies/list.html',
      controller: 'PoliciesController',
      bindings: {
        policies: '<',
        onSave: '&?',
        onDelete: '&?'
      }
    });
})();
