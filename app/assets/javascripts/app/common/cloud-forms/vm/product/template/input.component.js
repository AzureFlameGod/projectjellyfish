(function () {
  'use strict';

  angular.module('common')
    .component('cloudFormsVmProductTemplate', {
      templateUrl: 'common/cloud-forms/vm/product/template/input.html',
      controller: 'CloudFormsVmProductTemplateController',
      bindings: {
        item: '<',
        template: '<',
        onSelect: '&?'
      }
    });
})();
