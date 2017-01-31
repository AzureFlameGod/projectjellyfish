(function () {
  'use strict';

  angular.module('components.product-category', [
    'ui.router',
    'ngTagsInput',
    'components.reload-button'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('product-categories', {
    //     parent: 'manage',
    //     url: '/product-categories',
    //     redirectTo: 'product-categories.list'
    //   });
  }
})();
