(function () {
  'use strict';

  angular.module('components.product-category')
    .factory('ProductCategoryService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      build: build,
      create: create,
      update: update,
      delete: destroy,
      search: search,
      show: show,
      getProductCategoryById: show
    };

    var API_ROUTE = ApiService.routes.productCategories;

    return service;

    function build() {
      return {
        id: null,
        type: 'product_categories',
        attributes: {
          name: '',
          description: '',
          tag_list: []
        }
      };
    }

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }

    function create(data, query) {
      return ApiService.create(API_ROUTE, data, query);
    }

    function update(data, query) {
      return ApiService.update(API_ROUTE + '/' + data.id, data, query);
    }

    function destroy(data) {
      return ApiService.destroy(API_ROUTE + '/' + data.id);
    }
  }
})();
