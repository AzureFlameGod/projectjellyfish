(function () {
  'use strict';

  angular.module('components.service')
    .component('serviceStatusTag', {
      template: '<div class="tag" ng-class="$ctrl.classes" ng-bind="$ctrl.label"></div>',
//      templateUrl: 'components/service/status-tag/status-tag.html',
      controller: 'ServiceStatusTagController',
      bindings: {
        service: '<'
      }
    });
})();
