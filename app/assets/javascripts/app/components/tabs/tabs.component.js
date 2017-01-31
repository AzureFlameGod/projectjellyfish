(function () {
  'use strict';

  angular.module('components.tabs')
    .component('tabs', {
      templateUrl: 'components/tabs/tabs.html',
      controller: 'TabsController',
      bindings: {
        classes: '@?',
        selected: '<?'
      },
      transclude: true
    })
    .component('tab', {
      templateUrl: 'components/tabs/tab.html',
      controller: 'TabController',
      bindings: {
        label: '@'
      },
      require: {
        tabs: '^^'
      },
      transclude: true
    });
})();
