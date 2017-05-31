(function () {
  'use strict';

  angular.module('components.product')
    .component('productsList', {
      templateUrl: 'common/products/list/list.html',
      controller: 'ProductsListController',
      bindings: {
        query: '<',
        products: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('products.list', {
        url: '/all?page',
        views: {
          'main@app': 'productsList'
        },
        params: {
          page: {
            squash: true,
            value: '1'
          }
        },
        resolve: {
          query: function($transition$) {
            return {
              sort: 'name',
              page: {
                number: $transition$.params().page || 1
              }
            };
          },
          products: function(query, ProductService) {
            return ProductService.search(query);
          }
        }
      });
  }
})();
