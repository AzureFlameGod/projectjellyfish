(function () {
  'use strict';

  angular.module('components.service-request')
    .factory('ServiceRequestService', Factory);

  /** @ngInject */
  function Factory(ApiService) {
    var service = {
      build: build,
      buildApproval: buildApproval,
      search: search,
      show: show,
      create: create,
      update: update,
      destroy: destroy,
      approval: approval
    };

    var API_ROUTE = ApiService.routes.serviceRequests;

    return service;

    function build(product, project) {
      return {
        id: null,
        type: 'service_requests',
        attributes: {
          product_id: product.id,
          project_id: project.id
        }
      };
    }

    function buildApproval(request, approval) {
      return {
        id: request.id,
        type: 'service_request/approvals',
        attributes: {
          approval: approval,
          reason_message: request.attributes.reason_message
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

    function approval(id, data, query) {
      return ApiService.create(API_ROUTE + '/' + data.id + '/approval', data, query);
    }
  }
})();
