(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectEditController', Controller);

  /** @ngInject */
  function Controller($state, NotificationsService, ProjectService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.onUpdate = onUpdate;
    ctrl.onCancel = onCancel;

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
      }

      if (changes.member) {
        ctrl.member = angular.copy(ctrl.member);
      }
    }

    function onUpdate(event) {
      return ProjectService.update(event.project)
        .then(function (project) {
          $state.go('projects.show', {id: ctrl.project.id});
          NotificationsService.success("Project " + project.attributes.name + " has been updated.", 'Project Updated');
        });
    }

    function onCancel() {
      $state.go('projects.show', {id: ctrl.project.id});
    }
  }
})();
