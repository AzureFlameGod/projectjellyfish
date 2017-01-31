(function () {
  'use strict';

  var component = {
    templateUrl: 'components/notifications/notifications.html',
    controller: 'NotificationsController'
  };

  angular.module('components.notifications')
    .component('notifications', component);
})();
