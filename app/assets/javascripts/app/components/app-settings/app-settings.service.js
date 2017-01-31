(function () {
  'use strict';

  angular.module('components.app-settings')
    .factory('AppSettingsService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      get: get,
      set: set
    };

    var API_ROUTE = ApiService.routes.appSettings;

    return service;

    function get(query) {
      return ApiService.show(API_ROUTE, query);
    }

    function set(data, query) {
      return ApiService.update(API_ROUTE, data, query);
    }

  }
})();
