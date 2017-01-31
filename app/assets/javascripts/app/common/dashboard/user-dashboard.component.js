(function () {
  'use strict';

  var component = {
    templateUrl: 'common/dashboard/user-dashboard.html',
    controller: 'UserDashboardController'
  };

  angular.module('common')
    .component('userDashboard', component);
})();
