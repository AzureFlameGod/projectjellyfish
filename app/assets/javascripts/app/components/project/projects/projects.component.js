(function () {
  'use strict';

  angular.module('components.project')
    .component('projects', {
      templateUrl: 'components/project/projects/projects.html',
      controller: 'ProjectsController',
      bindings: {
        projects: '<',
        onSelect: '&?',
        onShow: '&?',
        onArchive: '&?'
      }
    });
})();
