(function () {
  'use strict';

  var component = {
    templateUrl: 'components/marketplace/configure-form/form.html',
    controller: 'ConfigureFormController',
    bindings: {
      serviceRequest: '<',
      // projects: '<',
      onUpdate: '&?',
      onDelete: '&?',
      onCancel: '&?'
    }
  };

  angular.module('components.marketplace')
    .component('configureForm', component);
})();
