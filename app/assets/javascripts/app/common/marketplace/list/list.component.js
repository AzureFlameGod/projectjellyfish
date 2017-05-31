(function () {
  'use strict';

  angular.module('common')
    .component('marketplace', {
      templateUrl: 'common/marketplace/list/list.html',
      controller: 'MarketplaceListingController',
      bindings: {
        query: '<',
        products: '<',
        productCategory: '<',
        productCategories: '<',
        project: '<?',
        projects: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('marketplace.list', {
        url: '/:productCategoryId?search&page',
        views: {
          'main@app': 'marketplace'
        },
        params: {
          productCategoryId: 'all',
          search: {
            squash: true,
            value: null
          },
          page: {
            squash: true,
            value: '1'
          }
        },
        reloadOnSearch: false,
        resolve: {
          productCategory: function ($transition$, productCategories) {
            var id = $transition$.params().productCategoryId;

            if (id && id !== 'all') {
              return productCategories.find(function (item) {
                return item.id === id;
              });
            }

            return null;
          },
          project: function($transition$, projects, CartService) {
            var id = $transition$.params().projectId;
            var project;

            if (id) {
              project = projects.find(function (item) {
                return item.id === id;
              });

              // TODO: DRY up when project app focus is complete
              CartService.project = angular.copy(project);

              return project;
            }

            return null;
          },
          query: function ($transition$, productCategory, project) {
            var search = $transition$.params().search;
            var query = {
              filter: {}
            };

            if (productCategory) {
              query.filter.tagged_with = productCategory.attributes.tag_list.join(',')
            }

            if (project) {
              query.filter.project_policy = project.id;
            }

            if (search) {
              query.filter.search = search;
            }

            query.page = {
              number: $transition$.params().page || 1
            };

            query.include = 'product_type';

            return query;
          },
          products: function (query, ProductService) {
            return ProductService.search(query);
          }
        }
      });
  }
})();
