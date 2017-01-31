(function () {
  'use strict';

  angular.module('components.marketplace', [
    'ui.router'
  ]).config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('marketplace', {
        parent: 'app',
        url: '/marketplace',
        redirectTo: 'marketplace.list',
        resolve: {
          productCategories: function(ProductCategoryService) {
            var query = {
              sort: 'name',
              fields: {
                product_categories: 'name,tag_list'
              }
            };

            return ProductCategoryService.search(query);
          },
          projects: function(ProjectService) {
            var query = {
              sort: 'name',
              fields: {
                projects: 'name'
              }
            };

            return ProjectService.search(query);
          }
        }
      });
  }
})();
