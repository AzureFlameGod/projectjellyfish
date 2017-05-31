(function () {
  'use strict';

  var appSidebar = {
    templateUrl: 'common/app-sidebar/app-sidebar.html',
    controller: 'AppSidebarController'
  };

  angular.module('common')
    .component('appSidebar', appSidebar);
})();
