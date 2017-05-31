(function () {
  'use strict';

  angular.module('common')
    .component('productCategoryNew', {
      templateUrl: 'common/product-categories/new/new.html',
      controller: 'NewProductCategoryController'
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('product-categories.new', {
        url: '/new',
        views: {
          'main@app': 'productCategoryNew'
        }
      });
  }
})();
