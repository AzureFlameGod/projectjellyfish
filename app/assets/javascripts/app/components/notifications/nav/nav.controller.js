(function () {
  'use strict';

  angular.module('components.notifications')
    .controller('NotificationsNavController', Controller);

  /** @ngInject */
  function Controller(NotificationsService) {
    var ctrl = this;

    ctrl.classes = {
      log: 'bd-primary',
      error: 'bd-danger',
      success: 'bd-success',
      warning: 'bd-warning',
      info: 'bd-info'
    };

    ctrl.icons = {
      log: 'is-dark fa-flag',
      error: 'is-danger fa-exclamation-circle',
      success: 'is-success fa-check-circle',
      warning: 'is-warning fa-exclamation-triangle',
      info: 'is-info fa-info-circle'
    };

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.clear = clear;

    function onInit() {
      ctrl.notifications = NotificationsService.notifications;
    }

    function onChanges(changes) {
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function clear() {
      NotificationsService.clear();
    }
  }
})();
