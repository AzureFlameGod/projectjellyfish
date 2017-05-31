(function () {
  'use strict';

  angular.module('components.service')
    .component('serviceActions', {
      /** @ngInject */
      templateUrl: function ($element, $attrs) {
        // Allow the ngSwitchWhen string to be used in place of the `template="foo/bar"`.
        var template = ($attrs.template || $attrs.ngSwitchWhen).replace(/_/g, '-');

        return 'components/service/actions/' + template + '.html'
      },
      controller: 'ServiceActionsController',
      bindings: {
        service: '<',
        isDisabled: '<',
        onAction: '&'
      }
    });
})();
