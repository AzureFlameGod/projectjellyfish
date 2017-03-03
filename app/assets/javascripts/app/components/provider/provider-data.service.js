(function () {
  'use strict';

  angular.module('components.provider')
    .factory('ProviderDataService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      search: search,
      show: show
    };

    var API_ROUTE = ApiService.routes.providerData;

    return service;

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }
  }
})();
