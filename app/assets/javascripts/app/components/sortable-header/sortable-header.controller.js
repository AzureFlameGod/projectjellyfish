(function () {
  'use strict';

  angular.module('components.sortable-header')
    .controller('SortableHeaderController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;
    ctrl.sortClass = sortClass;

    ctrl.doEvent = doEvent;

    function onInit() {
    }

    function onChanges(changes) {
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function sortClass() {
      if (ctrl.key != ctrl.sortBy) {
        return 'fa-sort';
      } else if (ctrl.sortDir === -1) {
        return 'fa-sort-down';
      } else {
        return 'fa-sort-up';
      }
    }

    function doEvent(event) {
      if (angular.isUndefined(ctrl['on' + event])) {
        return;
      }

      return ctrl['on' + event]({
        $event: {
          sortBy: ctrl.key,
          sortDir: ctrl.sortDir * -1
        }
      });
    }
  }
})();
