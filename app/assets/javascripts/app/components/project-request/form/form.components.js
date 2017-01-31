(function () {
  'use strict';

  angular.module('components.project-request')
    .component('projectRequestForm', {
      templateUrl: 'components/project-request/form/form.html',
      controller: 'ProjectRequestFormController',
      bindings: {
        projectRequest: '<',
        onCreate: '&?',
        onUpdate: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
