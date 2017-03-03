(function () {
  'use strict';

  angular.module('components.provider')
    .factory('ProviderService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      build: build,
      create: create,
      search: search,
      show: show,
      update: update,
      destroy: destroy,
      reconnect: reconnect,
      sync: sync
    };

    var API_ROUTE = ApiService.routes.providers;

    return service;

    function build() {
      return {
        id: null,
        type: 'providers',
        attributes: {
          type: '',
          provider_type_id: null,
          name: '',
          credentials: {},
          description: '',
          tag_list: [],
          active: true
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

    function reconnect(id, query) {
      return ApiService.update(API_ROUTE + '/' + id + '/connection', {data: {type: 'provider/connections'}}, query);
    }

    function sync(id, query) {
      return ApiService.create(API_ROUTE + '/' + id + '/sync', {data: {type: 'provider/sync'}}, query);
    }
  }
})();
