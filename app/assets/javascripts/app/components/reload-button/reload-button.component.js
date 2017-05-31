(function () {
  'use strict';

  angular.module('components.reload-button')
    .component('reloadButton', {
      templateUrl: 'components/reload-button/reload-button.html',
      bindings: {
        reload: '&',
        reloading: '<'
      }
    });
})();
