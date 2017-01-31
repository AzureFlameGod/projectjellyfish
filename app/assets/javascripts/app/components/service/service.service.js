(function () {
  'use strict';

  angular.module('components.service')
    .factory('ServiceService', Factory);

  /** @ngInject */
  function Factory(ApiService) {
    var service = {
      search: search,
      show: show,
      create: create,
      update: update,
      destroy: destroy,
      buildAction: buildAction,
      action: action
    };

    var API_ROUTE = ApiService.routes.services;

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

    function buildAction(service, action) {
      return {
        type: 'service/actions',
        id: service.id,
        attributes: {
          action: action
        }
      };
    }

    function action(id, data, query) {
      return ApiService.create(API_ROUTE + '/' + id + '/action', data, query);
    }
  }
})();
