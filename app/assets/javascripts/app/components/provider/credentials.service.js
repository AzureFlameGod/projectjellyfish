(function () {
  'use strict';

  angular.module('components.provider')
    .factory('CredentialsService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      validateCredentials: validateCredentials
    };

    var API_ROUTE = ApiService.routes.providers + '/credentials';

    return service;

    function validateCredentials(provider) {
      return ApiService.create(API_ROUTE, provider)
        .catch(function () {
          return {attributes: {valid: false, reason: 'There was a server error.'}};
        });
    }
  }
})();
