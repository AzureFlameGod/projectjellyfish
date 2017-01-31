(function () {
  'use strict';

  angular.module('components.notifications')
    .controller('NotificationsController', Controller);

  /** @ngInject */
  function Controller(NotificationsService) {
    var ctrl = this;

    ctrl.notifications = NotificationsService.notifications;

    ctrl.remove = NotificationsService.remove;
  }
})();
