(function () {
  'use strict';

  angular.module('components.marketplace', [
    'ui.router'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    // $stateProvider
    //   .state('marketplace', {
    //     parent: 'app',
    //     url: '/marketplace',
    //     redirectTo: 'marketplace.list',
    //     resolve: {
    //       productCategories: function(ProductCategoryService) {
    //         return ProductCategoryService.getProductCategories();
    //       }
    //     }
    //   });
  }
})();
