(function () {
  'use strict';

  angular.module('common')
    .component('projectSidebar', {
      templateUrl: 'common/projects/show/sidebar/sidebar.html',
      controller: 'ProjectSidebarController',
      bindings: {
        project: '<',
        member: '<'
      }
    });
})();
