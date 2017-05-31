(function () {
  'use strict';

  angular.module('components.product')
    .component('productNewStep1', {
      templateUrl: 'common/products/new/step-1.html',
      controller: 'ProductNewStep1Controller',
      bindings: {
        query: '<',
        providers: '<'
      }
    })
    .component('productNewStep2', {
      templateUrl: 'common/products/new/step-2.html',
      controller: 'ProductNewStep2Controller',
      bindings: {
        query: '<',
        provider: '<',
        productTypes: '<'
      }
    })
    .component('productNewStep3', {
      templateUrl: 'common/products/new/step-3.html',
      controller: 'ProductNewStep3Controller',
      bindings: {
        provider: '<',
        productType: '<'
      }
    })
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('products.new', {
        url: '/new',
        views: {
          'main@app': 'productNewStep1'
        },
        resolve: {
          query: function () {
            return {
              sort: 'name',
              page: {
                number: 1
              }
            };
          },
          providers: function (query, ProviderService) {
            return ProviderService.search(query);
          }
        }
      })
      .state('product-new-step-2', {
        parent: 'products.new',
        url: '/:providerId',
        views: {
          'main@app': 'productNewStep2'
        },
        resolve: {
          provider: function ($transition$, providers, ProviderService) {
            var id = $transition$.params().providerId;
            var provider = providers.find(function (item) {
              return item.id === id;
            });

            if (provider) {
              return provider;
            }

            return ProviderService.show(id);
          },
          query: function (provider) {
            return {
              sort: 'name',
              page: {
                number: 1
              },
              filter: {
                provider_type_id: provider.attributes.provider_type_id
              }
            };
          },
          productTypes: function (query, ProductTypeService) {
            return ProductTypeService.search(query);
          }
        }
      })
      .state('product-new-step-3', {
        parent: 'product-new-step-2',
        url: '/:productTypeId',
        views: {
          'main@app': 'productNewStep3'
        },
        resolve: {
          productType: function ($transition$, productTypes, ProductTypeService) {
            var id = $transition$.params().productTypeId;
            var productType = productTypes.find(function (item) {
              return item.id === id;
            });

            if (productType) {
              return productType;
            }

            return ProductTypeService.show(id);
          }
        }
      });
  }
})();
