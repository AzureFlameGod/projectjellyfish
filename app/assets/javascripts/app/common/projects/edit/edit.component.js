(function () {
  'use strict';

  var component = {
    templateUrl: 'common/projects/edit/edit.html',
    controller: 'ProjectEditController',
    bindings: {
      project: '<',
      member: '<'
    }
  };

  angular.module('common')
    .component('projectEdit', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'projectEdit'
        },
        resolve: {
          project: function($transition$, ProjectService) {
            var id = $transition$.params().id;

            return ProjectService.show(id);
          },
          member: function($transition$, AuthService, MemberService) {
            var id = $transition$.params().id;

            var query = {
              fields: {
                members: 'user_name,role'
              },
              filter: {
                project_id: id,
                user_id: AuthService.getUser().id
              }
            };

            return MemberService.search(query)
              .then(function (results) {
                if (results.length === 1) {
                  return results[0];
                }

                return results;
              });
          }
        }
      })
  }
})();
