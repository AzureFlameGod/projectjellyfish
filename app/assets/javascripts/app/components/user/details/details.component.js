(function () {
  'use strict';

  var component = {
    templateUrl: 'components/user/details/details.html',
    bindings: {
      user: '<'
    }
  };

  angular.module('components.user')
    .component('userDetails', component);
})();
