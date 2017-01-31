(function () {
  'use strict';

  var component = {
    templateUrl: 'common/product-categories/list/list.html',
    controller: 'ProductCategoriesListController',
    bindings: {
      query: '<',
      productCategories: '<'
    }
  };

  angular.module('common')
    .component('productCategoriesList', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('product-categories.list', {
        url: '',
        views: {
          'main@app': 'productCategoriesList'
        },
        resolve: {
          query: function () {
            return {
              sort: 'name'
            }
          },
          productCategories: function(query, ProductCategoryService) {
            return ProductCategoryService.search(query);
          }
        }
      })
  }
})();
