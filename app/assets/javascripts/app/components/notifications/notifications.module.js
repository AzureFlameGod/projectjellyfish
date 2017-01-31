(function () {
  'use strict';

  angular.module('components.notifications', [])
    .run(setup);

  /** @ngInject */
  function setup($transitions, NotificationsService) {
    $transitions.onFinish('*', function() {
      NotificationsService.clear();
    });
  }
})();
