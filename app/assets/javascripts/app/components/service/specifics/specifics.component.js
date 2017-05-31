(function () {
  'use strict';

  angular.module('components.service')
    .component('serviceSpecifics', {
      /** @ngInject */
      templateUrl: function ($element, $attrs) {
        // Allow the ngSwitchWhen string to be used in place of the `template="foo/bar"`.
        var template = ($attrs.template || $attrs.ngSwitchWhen).replace(/_/g, '-');

        return 'components/service/specifics/' + template + '.html'
      },
      controller: 'ServiceSpecificsController',
      bindings: {
        service: '<',
        isDisabled: '<',
        onAction: '&'
      }
    });
})();
