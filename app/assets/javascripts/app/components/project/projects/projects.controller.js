(function () {
  'use strict';

  angular.module('components.project')
    .controller('ProjectsController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.hasActions = hasActions;
    ctrl.doEvent = doEvent;
    ctrl.selectProject = selectProject;

    function onChanges(changes) {
      if (changes.projects) {
        ctrl.projects = angular.copy(ctrl.projects);
      }
    }

    function selectProject(project) {
      ctrl.onSelect({
        $event: {
          project: project
        }
      });
    }

    function hasActions() {
      return ctrl.onShow || ctrl.onArchive;
    }

    function doEvent(event, project) {
      return ctrl['on' + event]({
        $event: {
          project: project
        }
      });
    }
  }
})();
