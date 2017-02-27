(function () {
  'use strict';

  angular.module('components.notifications')
    .factory('NotificationsService', Factory);

  /** @ngInject */
  function Factory(toastr, moment) {
    var service = {
      notifications: [],
      clear: clear,
      remove: remove,
      log: log,
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

    function log(message, options) {
      if (angular.isUndefined(options.toast)) {
        options.toast = false;
      }

      add('log', message, '', defaultOptions(options));
    }

    function error(message, title, options) {
      add('error', message, title, defaultOptions(options));
    }

    function success(message, title, options) {
      add('success', message, title, defaultOptions(options));
    }

    function warning(message, title, options) {
      add('warning', message, title, defaultOptions(options));
    }

    function info(message, title, options) {
      add('info', message, title, defaultOptions(options));
    }

    function defaultOptions(options) {
      return angular.merge({}, {
        toast: true,
        link: {
          state: '',
          params: {}
        },
        // TODO: More text when implemented will cause an '...' icon to be added to the message on the right side.
        // When clicked it will display a small modal with the more text rendered as `ng-bind-html` within a .content div
        more: ''
      }, options);
    }

    function add(type, message, title, options) {
      var notification = {
        acknowledged: false,
        when: moment().format(),
        type: type,
        message: message,
        title: title,
        link: options.link,
        more: options.more
      };

      if (options.toast) {
        toastr[type](message, title, {
          onHidden: function(acknowledged, _toast) {
            notification.acknowledged = acknowledged;
          }
        });
      }

      service.notifications.unshift(notification);
    }
  }
})();
