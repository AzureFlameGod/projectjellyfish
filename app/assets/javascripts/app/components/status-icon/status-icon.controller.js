(function () {
  'use strict';

  angular.module('components.status-icon')
    .controller('StatusIconController', Controller);

  /** @ngInject */
  function Controller(moment) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
      if (changes.img) {
        ctrl.img = angular.copy(ctrl.img);
      }

      if (changes.health) {
        if (ctrl.health) {
          ctrl.healthClasses = 'fa-check is-success';
        } else {
          ctrl.healthClasses = 'fa-exclamation is-danger';
        }
      }

      if (changes.updated) {
        var diff = moment().diff(ctrl.updated, 'seconds');
        if (diff >=  600) {
          ctrl.updatedClasses = 'fa-hourclass-end is-danger';
        } else if (diff >= 60) {
          ctrl.updatedClasses = 'fa-hourglass-half is-warning';
        } else {
          ctrl.updatedClasses = 'fa-hourglass-start is-success';
        }
      }
    }
  }
})();
