(function () {
  'use strict';

  angular.module('common')
    .component('cloudFormsVmProductFlavor', {
      templateUrl: 'common/cloud-forms/vm/product/flavor/input.html',
      controller: 'CloudFormsVmProductFlavorController',
      bindings: {
        item: '<',
        flavor: '<',
        onSelect: '&?'
      }
    });
})();
