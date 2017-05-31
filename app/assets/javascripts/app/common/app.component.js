(function () {
  'use strict';

  var app = {
    templateUrl: 'common/app.html',
    controller: 'AppController'
  };

  angular.module('common')
    .component('app', app)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('app', {
        url: '?projectId',
        redirectTo: 'dashboard',
        views: {
          '': 'app',
          'sidebar@app': 'appSidebar'
        },
        params: {
          // Allow the user to select a project and have
          // various pages react to the active project.
          projectId: {
            squash: true,
            value: null
          }
        },
        data: {
          requireAuthentication: true
        }
      })
      .state('manage', {
        parent: 'app',
        url: '/manage',
        data: {
          requireRole: ['manager', 'admin']
        }
      })
      .state('admin', {
        parent: 'app',
        url: '/admin',
        data: {
          requireRole: ['admin']
        }
      });
  }
})();
