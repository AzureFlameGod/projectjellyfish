(function () {
  'use strict';

  angular.module('components.project')
    .factory('MembershipService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      build: build,
      create: create,
      search: search,
      show: show,
      update: update,
      destroy: destroy
    };

    var API_ROUTE = ApiService.routes.memberships;

    return service;

    function build(project, user) {
      return {
        type: 'memberships',
        attributes: {
          project_id: project.id,
          user_id: user.id,
          role: 'user'
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
