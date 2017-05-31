(function () {
  'use strict';

  var component = {
    /** @ngInject */
    templateUrl: function ($element, $attrs) {
      // Allow the ngSwitchWhen string to be used in place of the `type-name`.
      var type = ($attrs.typeName || $attrs.ngSwitchWhen).replace(/_/g, '-');
      var property = ($attrs.property || 'settings').replace(/_/g, '-');

      return 'components/settings/' + type + '-' + property + '.html'
    },
    controller: 'SettingsController',
    bindings: {
      item: '<',
      property: '@?',
      onChange: '&?'
    }
  };

  angular.module('components.settings')
    .component('settings', component);
})();
