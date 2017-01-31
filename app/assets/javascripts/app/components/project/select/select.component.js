(function () {
  'use strict';

  var component = {
    templateUrl: 'components/project/select/select.html',
    bindings: {
      projects: '<',
      selected: '<',
      defaultOption: '@?',
      onSelect: '&'
    }
  };

  angular.module('components.project')
    .component('projectSelect', component);
})();
