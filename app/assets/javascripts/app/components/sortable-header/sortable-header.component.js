(function () {
  'use strict';

  angular.module('components.sortable-header')
    .component('sortableHeader', {
      templateUrl: 'components/sortable-header/sortable-header.html',
      controller: 'SortableHeaderController',
      bindings: {
        key: '@',
        sortBy: '<',
        sortDir: '<',
        onSort: '&'
      },
      transclude: true
    });
})();
