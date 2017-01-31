(function () {
  'use strict';

  angular.module('components.marketplace')
    .factory('CartService', Factory);

  /** @ngInject */
  function Factory(ApiService, AuthService, ServiceRequestService, ServiceOrderService) {
    var service = {
      getItems: getItems,
      reload: reload,
      addToCart: create,
      removeFromCart: destroy,
      configure: update,
      order: order,
      search: search
    };

    var API_ROUTE = ApiService.routes.cart;
    var items = false;

    return service;

    function getItems() {
      if (items === false) {
        return load();
      }

      return items;
    }

    function reload() {
      return load();
    }

    function create(serviceRequest) {

      var query = {
        include: 'product',
        fields: {
          products: 'type,name,description,setup_price,hourly_price,monthly_price,monthly_cost'
        }
      };

      return ServiceRequestService
        .create(serviceRequest, query)
        .then(function (newRequest) {
          if (newRequest.attributes.state == 'pending') {
            items.push(newRequest);
          }
        });
    }

    function update(serviceRequest) {
      var query = {
        include: 'product',
        fields: {
          products: 'type,name,description,setup_price,hourly_price,monthly_price,monthly_cost'
        }
      };

      var local = items.find(function (item) {
        return item.id == serviceRequest.id;
      });

      return ServiceRequestService
        .update(serviceRequest, query)
        .then(function (updatedRequest) {
          items.splice(items.indexOf(local), 1, updatedRequest);
        });
    }

    function destroy(serviceRequest) {
      var local = items.find(function (item) {
        return item.id == serviceRequest.id;
      });

      if (!local) {
        return;
      }

      return ServiceRequestService
        .destroy(local)
        .then(function () {
          items.splice(items.indexOf(local), 1);
        });
    }

    function order() {
      return ServiceOrderService.create(ServiceOrderService.build())
        .finally(function () {
          reload();
        });
    }

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function load() {
      var query = {
        include: 'product',
        fields: {
          products: 'type,name,description,setup_price,monthly_cost'
        },
        filter: {
          with_states: ['pending', 'configured'],
          user_id: AuthService.getUser().id
        }
      };

      return ServiceRequestService
        .search(query)
        .then(function (requests) {
          if (items) {
            items.length = 0;
          } else {
            items = [];
          }

          Array.prototype.push.apply(items, requests);
          return items;
        });
    }
  }
})();
