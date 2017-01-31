(function () {
  'use strict';

  angular.module('common')
    .component('projectQuestionEdit', {
      templateUrl: 'common/project-questions/edit/edit.html',
      controller: 'ProjectQuestionEditController',
      bindings: {
        projectQuestion: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('project-questions.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'projectQuestionEdit'
        },
        resolve: {
          projectQuestion: function($transition$, ProjectQuestionService) {
            var id = $transition$.params().id;

            return ProjectQuestionService.show(id);
          }
        }
      })
  }
})();
