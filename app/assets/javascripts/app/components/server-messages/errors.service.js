(function () {
  'use strict';

  angular.module('components.server-messages')
    .factory('ErrorsService', Factory);

  /** @ngInject */
  function Factory() {
    var service = {
      parse: parse
    };

    return service;

    function parse(response) {
      return new Errors(response.data.errors, response.status);
    }
  }

  function Errors(errors, status) {
    var service = this;

    service.status = status;
    service.pointers = {};

    service.pointer = pointer;

    function pointer(path, error) {
      if (angular.isUndefined(path) || path == '') {
        return;
      }

      if (angular.isUndefined(service.pointers[path])) {
        service.pointers[path] = {};
      }

      service.pointers[path][error.code] = error.detail.replace(/`.+?`\s?/, '');
    }

    angular.forEach(errors, function(error) {
      if (error.source){
        pointer(error.source.pointer, error);
      }
    });
  }
})();
