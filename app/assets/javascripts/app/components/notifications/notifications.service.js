(function () {
  'use strict';

  angular.module('components.notifications')
    .factory('NotificationsService', Factory);

  /** @ngInject */
  function Factory() {
    var service = {
      notifications: [],
      clear: clear,
      remove: remove,
      error: error,
      success: success,
      warning: warning,
      info: info
    };

    return service;

    function clear() {
      service.notifications.length = 0;
    }

    function remove(index) {
      service.notifications.splice(index, 1);
    }

    function error(message, title) {
      add('is-danger', message, title);
    }

    function success(message, title) {
      add('is-success', message, title);
    }

    function warning(message, title) {
      add('is-warning', message, title);
    }

    function info(message, title) {
      add('is-info', message, title);
    }

    function add(type, message, title) {
      service.notifications.unshift({
        type: type,
        message: message,
        title: title
      });
    }
  }
})();
