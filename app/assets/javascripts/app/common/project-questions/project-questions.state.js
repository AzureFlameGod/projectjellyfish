(function () {
  'use strict';

  angular.module('common')
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('project-questions', {
        parent: 'manage',
        url: '/project-questions',
        redirectTo: 'project-questions.list'
      });
  }
})();
