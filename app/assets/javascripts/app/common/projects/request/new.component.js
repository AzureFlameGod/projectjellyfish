(function () {
  'use strict';

  var component = {
    templateUrl: 'common/projects/request/new.html',
    controller: 'RequestProjectController'
  };

  angular.module('common')
    .component('requestProject', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('projects.request', {
        url: '/request',
        views: {
          'main@app': 'requestProject'
        }
      });
  }
})();
