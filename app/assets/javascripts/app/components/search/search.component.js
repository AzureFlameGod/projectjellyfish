(function () {
  'use strict';

  angular.module('components.search')
    .component('search', {
      templateUrl: 'components/search/search.html',
      controller: 'SearchController',
      bindings: {
        terms: '<?',
        placeholder: '@?',
        label: '@?',
        onSearch: '&?'
      }
    });
})();
