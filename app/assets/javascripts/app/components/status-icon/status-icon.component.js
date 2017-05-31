(function () {
  'use strict';

  angular.module('components.status-icon')
    .component('statusIcon', {
      templateUrl: 'components/status-icon/status-icon.html',
      controller: 'StatusIconController',
      bindings: {
        img: '<',
        health: '<',
        updated: '<'
      }
    });
})();
