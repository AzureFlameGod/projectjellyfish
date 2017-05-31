(function () {
  'use strict';

  var component = {
    templateUrl: 'common/dashboard/admin-dashboard.html',
    controller: 'AdminDashboardController'
  };

  angular.module('common')
    .component('adminDashboard', component);
})();
