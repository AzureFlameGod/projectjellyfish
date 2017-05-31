(function () {
  'use strict';

  angular.module('components.product')
    .factory('ProductTypeService', ProductTypeService);

  /** @ngInject */
  function ProductTypeService(ApiService) {
    var service = {
      search: search,
      show: show
    };

    var API_ROUTE = ApiService.routes.productTypes;

    return service;

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }
  }
})();
