(function () {
  'use strict';

  var component = {
    templateUrl: 'common/products/edit/edit.html',
    controller: 'ProductEditController',
    bindings: {
      product: '<'
    }
  };

  angular.module('common')
    .component('productEdit', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('products.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'productEdit'
        },
        resolve: {
          product: function($transition$, ProductService) {
            var id = $transition$.params().id;

            return ProductService.show(id);
          }
        }
      })
  }
})();
