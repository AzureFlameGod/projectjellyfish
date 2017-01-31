(function () {
  'use strict';

  angular.module('common')
    .component('showProject', {
      templateUrl: 'common/projects/show/info/project.html',
      controller: 'ShowProjectController',
      bindings: {
        project: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show.info', {
        views: {
          'main@app': 'showProject'
        }
      });
  }
})();
