(function () {
  'use strict';

  angular.module('components.dashboard')
    .component('projectsSpentWidget', {
      templateUrl: 'components/dashboard/projects-spent/widget.html',
      controller: 'ProjectsSpentWidget',
      bindings: {
        projects: '<'
      }
    });
})();
