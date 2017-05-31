(function () {
  'use strict';

  angular.module('components.project')
    .component('projectForm', {
      templateUrl: 'components/project/form/form.html',
      controller: 'ProjectFormController',
      bindings: {
        project: '<',
        member: '<',
        onUpdate: '&?',
        onDelete: '&?',
        onCancel: '&?'
      }
    });
})();
