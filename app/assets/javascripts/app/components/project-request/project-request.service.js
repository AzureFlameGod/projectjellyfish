(function () {
  'use strict';

  angular.module('components.service-request')
    .factory('ProjectRequestService', Factory);

  /** @ngInject */
  function Factory(ApiService) {
    var service = {
      build: build,
      buildApproval: buildApproval,
      search: search,
      show: show,
      create: create,
      update: update,
      approval: approval
    };

    var API_ROUTE = ApiService.routes.projectRequests;

    return service;

    function build() {
      return {
        id: null,
        type: 'project_requests',
        attributes: {
          name: '',
          budget: "0.00",
          request_message: ''
        }
      };
    }

    function buildApproval(request, approval) {
      return {
        id: request.id,
        type: 'project_request/approvals',
        attributes: {
          approval: approval || 'approve',
          reason_message: request.attributes.reason_message,
          budget: request.attributes.budget
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

    function approval(id, data, query) {
      return ApiService.create(API_ROUTE + '/' + data.id + '/approval', data, query);
    }
  }
})();
