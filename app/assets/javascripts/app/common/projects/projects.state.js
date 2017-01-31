(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects', {
        parent: 'app',
        url: '/projects',
        views: {
          'projects@app': 'projectsSidebar'
        },
        redirectTo: 'projects.list'
      });
  }
})();
