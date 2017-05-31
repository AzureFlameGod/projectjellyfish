(function () {
  'use strict';

  angular.module('components.provider', [
    'ui.router',
    'ngTagsInput',
    'angularMoment'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('providers', {
    //     parent: 'admin',
    //     url: '/providers',
    //     redirectTo: 'providers.list'
    //   });
  }
})();
