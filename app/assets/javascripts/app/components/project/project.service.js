(function () {
  'use strict';

  angular.module('components.project')
    .factory('ProjectService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      create: create,
      search: search,
      show: show,
      update: update,
      destroy: destroy
    };

    var API_ROUTE = ApiService.routes.projects;

    return service;

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
