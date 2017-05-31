(function () {
  'use strict';

  angular.module('components.service')
    .factory('ServiceDetailService', Factory);

  /** @ngInject */
  function Factory(ApiService) {
    var service = {
      search: search,
      show: show
    };

    var API_ROUTE = ApiService.routes.serviceDetails;

    return service;

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }
  }
})();
