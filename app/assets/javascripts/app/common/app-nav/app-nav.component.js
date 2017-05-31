(function () {
  'use strict';

  var appNav = {
    templateUrl: 'common/app-nav/app-nav.html',
    bindings: {
      user: '<',
      onLogout: '&'
    }
  };

  angular.module('common')
    .component('appNav', appNav);
})();
