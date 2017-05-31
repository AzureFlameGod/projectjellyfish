(function () {
  'use strict';

  var component = {
    templateUrl: 'common/dashboard/manager-dashboard.html',
    controller: 'ManagerDashboardController'
  };

  angular.module('common')
    .component('managerDashboard', component);
})();
