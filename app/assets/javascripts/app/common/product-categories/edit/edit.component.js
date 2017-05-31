(function () {
  'use strict';

  angular.module('common')
    .component('productCategoryEdit', {
      templateUrl: 'common/product-categories/edit/edit.html',
      controller: 'ProductCategoryEditController',
      bindings: {
        productCategory: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('product-categories.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'productCategoryEdit'
        },
        resolve: {
          productCategory: function($transition$, ProductCategoryService) {
            var id = $transition$.params().id;

            return ProductCategoryService.show(id);
          }
        }
      })
  }
})();
