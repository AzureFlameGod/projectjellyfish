(function () {
  'use strict';

  var component = {
    templateUrl: 'common/products/show/show.html',
    controller: 'ProductShowController',
    bindings: {
      query: '<',
      product: '<'
    }
  };

  angular.module('common')
    .component('productShow', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('products.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'productShow'
        },
        resolve: {
          query: function() {
            return {
              include: 'provider',
              fields: {
                providers: 'name'
              }
            }
          },
          product: function($transition$, query, ProductService) {
            var id = $transition$.params().id;

            return ProductService.show(id, query);
          }
        }
      });
  }
})();
