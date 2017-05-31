(function () {
  'use strict';

  var appFooter = {
    templateUrl: 'common/app-footer/app-footer.html',
    controller: 'AppFooterController'
  };

  angular.module('common')
    .component('appFooter', appFooter);
})();
