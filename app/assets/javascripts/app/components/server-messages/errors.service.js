(function () {
  'use strict';

  angular.module('components.server-messages')
    .factory('ErrorsService', Factory);

  /** @ngInject */
  function Factory() {
    var service = {
      parse: parse,
      subscribe: subscribe,
      unsubscribe: unsubscribe
    };

    var listeners = [];

    return service;

    function parse(response) {
      var errors = {
        status: response.status,
        errors: {}
      };

      if (angular.isUndefined(response.data.errors)) {
        return notifyListeners(errors);
      }

      angular.forEach(response.data.errors, function (error) {
        var path;

        // Only concerned with errors involving user accessible data
        if (angular.isUndefined(error.source) || !error.source.pointer.match('data\/attributes')) {
          return;
        }

        path = error.source.pointer.replace('/data/attributes/', '');

        if (angular.isUndefined(errors.errors[path])) {
          errors.errors[path] = {};
        }

        errors.errors[path][error.code] = error.detail;
      });

      notifyListeners(errors);

      return errors;
    }

    function subscribe(func) {
      listeners.push(func);
    }

    function unsubscribe(func) {
      var index = listeners.indexOf(func);

      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }

    function notifyListeners(errors) {
      angular.forEach(listeners, function(listener) {
        listener.call(null, errors);
      });
    }
  }
})();
