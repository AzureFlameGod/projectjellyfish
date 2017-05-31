(function () {
  'use strict';

  angular.module('common')
    .component('projectQuestionNew', {
      templateUrl: 'common/project-questions/new/new.html',
      controller: 'ProjectQuestionNewController',
      bindings: {
        projectQuestion: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('project-questions.new', {
        url: '/new',
        views: {
          'main@app': 'projectQuestionNew'
        },
        resolve: {
          projectQuestion: function(ProjectQuestionService) {
            return ProjectQuestionService.build();
          }
        }
      })
  }
})();
