(function () {
  'use strict';

  angular.module('components.dashboard')
    .component('projectsProjectedWidget', {
      templateUrl: 'components/dashboard/projects-projected/widget.html',
      controller: 'ProjectsProjectedWidget',
      bindings: {
        projects: '<'
      }
    });
})();
