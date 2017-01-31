(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'sidebar@app': 'projectSidebar'
        },
        resolve: {
          project: function ($transition$, ProjectService) {
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
                if (results.length == 1) {
                  return results[0];
                }

                return results;
              });
          }
        },
        redirectTo: 'projects.show.info'
      });
  }
})();
