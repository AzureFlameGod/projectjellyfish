(function () {
  'use strict';

  angular.module('common')
    .component('projectQuestionsList', {
      templateUrl: 'common/project-questions/list/list.html',
      controller: 'ProjectQuestionsListController',
      bindings: {
        query: '<',
        projectQuestions: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('project-questions.list', {
        url: '/all?page',
        views: {
          'main@app': 'projectQuestionsList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          query: function($transition$) {
            return {
              sort: 'label',
              page: {
                number: $transition$.params().page || 1
              }
            };
          },
          projectQuestions: function (query, ProjectQuestionService) {
            return ProjectQuestionService.search(query);
          }
        }
      })
  }
})();
