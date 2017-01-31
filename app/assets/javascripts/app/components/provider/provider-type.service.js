(function () {
  'use strict';

  angular.module('components.provider')
    .factory('ProviderTypeService', ProviderTypeService);

  /** @ngInject */
  function ProviderTypeService(ApiService) {
    var service = {
      getProviderTypes: search,
      getProviderTypeById: show
    };

    var API_ROUTE = ApiService.routes.providerTypes;

    return service;

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }
  }
})();
