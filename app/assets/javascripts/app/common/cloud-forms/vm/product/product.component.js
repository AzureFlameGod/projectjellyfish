(function () {
  'use strict';

  angular.module('common')
    .component('cloudFormsVmProduct', {
      templateUrl: 'common/cloud-forms/vm/product/product.html',
      controller: 'CloudFormsVmProductController',
      bindings: {
        item: '='
      }
    });
})();
