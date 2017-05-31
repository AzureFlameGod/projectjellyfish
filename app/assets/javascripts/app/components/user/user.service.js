(function () {
  'use strict';

  angular.module('components.user')
    .factory('UserService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      build: build,
      buildPassword: buildPassword,
      create: create,
      search: search,
      show: show,
      update: update,
      destroy: destroy,
      updatePassword: updatePassword,
      buildAction: buildAction,
      action: action
    };

    var API_ROUTE = ApiService.routes.users;

    return service;

    function build() {
      return {
        type: 'users',
        attributes: {
          name: '',
          email: '',
          role: 'user',
          state: 'pending'
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

    function buildPassword() {
      return {
        type: 'user/passwords',
        attributes: {
          password: '',
          password_confirmation: ''
        }
      };
    }

    function updatePassword(id, data, query) {
      return ApiService.update(API_ROUTE + '/' + id + '/password', data, query);
    }

    function buildAction(user, action) {
      return {
        type: 'user/actions',
        id: user.id,
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
