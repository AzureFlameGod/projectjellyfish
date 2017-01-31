(function () {
  'use strict';

  angular.module('components.autocomplete')
    .component('autocomplete', {
      templateUrl: 'components/autocomplete/autocomplete.html',
      controller: 'AutocompleteController',
      bindings: {
        items: '<',
        isLoading: '<',
        onChange: '&',
        onSelect: '&'
      }
    });
})();
