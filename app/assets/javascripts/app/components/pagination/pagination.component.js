(function () {
  'use strict';

  var component = {
    templateUrl: 'components/pagination/pagination.html',
    controller: 'PaginationController',
    bindings: {
      pagination: '<',
      // page: '<',
      // totalPages: '<',
      onChangePage: '&'
    }
  };

  angular.module('components.pagination')
    .component('pagination', component);
})();
