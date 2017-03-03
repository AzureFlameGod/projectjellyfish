(function () {
  'use strict';

  angular.module('components.search')
    .controller('SearchController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.doEvent = doEvent;

    function onInit() {
      if (angular.isUndefined(ctrl.placeholder)) {
        ctrl.placeholder = 'search';
      }
    }

    function onChanges(changes) {
      if (changes.terms) {
        ctrl.terms = angular.copy(ctrl.terms);
      }
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function doEvent(event, item) {
      if (angular.isUndefined(ctrl['on'+ event])) {
        return;
      }

      return ctrl['on' + event]({
        $event: {
          search: item
        }
      });
    }
  }
})();
