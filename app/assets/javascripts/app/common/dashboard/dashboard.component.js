(function () {
  'use strict';

  var dashboard = {
    templateUrl: 'common/dashboard/dashboard.html',
    bindings: {
      user: '<',
      projects: '<'
    }
  };

  angular.module('common')
    .component('dashboard', dashboard)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('dashboard', {
        parent: 'app',
        url: '/dashboard',
        views: {
          'main': 'dashboard'
        },
        resolve: {
          user: function(AuthService) {
            return AuthService.getUser();
          },
          projects: function(ProjectService) {
            return ProjectService.search({
              fields: {
                projects: 'name,budget,spent,monthly_spend'
              },
              sort: 'name'
            });
          }
        }
      });
  }
})();
