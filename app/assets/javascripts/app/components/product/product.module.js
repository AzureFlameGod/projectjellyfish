(function () {
  'use strict';

  angular.module('components.product', [
    'ui.router',
    'ngTagsInput',
    'components.reload-button'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('products', {
    //     parent: 'manage',
    //     url: '/products',
    //     redirectTo: 'products.list'
    //   });
  }
})();
