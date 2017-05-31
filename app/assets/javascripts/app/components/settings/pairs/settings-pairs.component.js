(function () {
  'use strict';

  var component = {
    templateUrl: 'components/settings/pairs/settings-pairs.html',
    controller: 'SettingsPairsController',
    bindings: {
      settings: '<',
      pairsKey: '@pairs',
      labels: '<?',
      add: '@?',
      remove: '@?',
      onChange: '&',
      valueRequired: '<?'
    }
  };

  angular.module('components.settings')
    .component('settingsPairs', component);
})();
