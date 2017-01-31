(function () {
  'use strict';

  angular.module('components.filter')
    .component('policyModal', {
      templateUrl: 'components/filter/policy-modal/modal.html',
      controller: 'PolicyModalController',
      bindings: {
        policy: '<',
        onSave: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
