(function () {
  'use strict';

  angular.module('components.service')
    .controller('ServiceStatusTagController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    var warn = ['deprovisioned', 'terminated'];

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
      if (changes.service) {
        ctrl.service = angular.copy(ctrl.service);
        ctrl.label = ctrl.service.attributes.status;
        setClasses();
      }
    }

    function setClasses() {
      if (ctrl.service.attributes.health == 'ok') {
        if (-1 != warn.indexOf(ctrl.service.attributes.status)) {
          ctrl.classes = 'is-warning';
        } else {
          ctrl.classes = 'is-success';
        }
      } else if (ctrl.service.attributes.health == 'error') {
        ctrl.classes = 'is-danger';
      } else {
        ctrl.classes = 'is-dark'
      }
    }
  }
})();
